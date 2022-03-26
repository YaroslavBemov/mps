import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Department from 'App/Models/Department'
import Sector from 'App/Models/Sector'

export default class SectorsController {
  public async index({}: HttpContextContract) {
    const sectors = await Sector.all()

    return sectors
  }

  public async store({ request, response }: HttpContextContract) {
    const newSectorSchema = schema.create({
      title: schema.string({ trim: true }),
      step: schema.number(),
      departmentId: schema.number(),
    })

    const payload = await request.validate({ schema: newSectorSchema })
    const department = await Department.find(payload.departmentId)

    if (!department) {
      response.status(409)
      return { message: `There are not department with this id - ${payload.departmentId}` }
    }

    const sector = await Sector.findBy('title', payload.title)

    if (sector) {
      response.status(409)
      return { message: `Sector with title - ${sector.title} already exist` }
    }

    const newSector = await Sector.create(payload)
    return newSector
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const sector = await Sector.find(id)

    if (!sector) {
      response.status(404)
      return { message: 'Not found' }
    }

    return sector
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const sector = await Sector.find(id)

    if (!sector) {
      response.status(404)
      return { message: 'Not found' }
    }

    const newSectorSchema = schema.create({
      title: schema.string({ trim: true }),
      step: schema.number(),
      departmentId: schema.number(),
    })

    const payload = await request.validate({ schema: newSectorSchema })

    const department = await Department.find(payload.departmentId)

    if (!department) {
      response.status(409)
      return { message: `There are not department with this id - ${payload.departmentId}` }
    }

    await sector.merge(payload).save()

    return sector
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const sector = await Sector.find(id)

    if (!sector) {
      response.status(404)
      return { message: 'Not found' }
    }

    await sector.delete()
    response.status(204)
  }
}
