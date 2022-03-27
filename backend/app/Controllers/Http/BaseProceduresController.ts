import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import BaseMtp from 'App/Models/BaseMtp'
import BaseProcedure from 'App/Models/BaseProcedure'
import Sector from 'App/Models/Sector'

export default class BaseProceduresController {
  public async index({}: HttpContextContract) {
    const baseProcedures = await BaseProcedure.all()

    return baseProcedures
  }

  public async store({ request, response }: HttpContextContract) {
    const newBaseProcedureSchema = schema.create({
      baseMtpId: schema.number(),
      position: schema.number(),
      title: schema.string({ trim: true }),
      sectorId: schema.number(),
      timeTotal: schema.number(),
      timePerProduct: schema.number(),
      comment: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: newBaseProcedureSchema })

    const baseMtp = await BaseMtp.find(payload.baseMtpId)
    if (!baseMtp) {
      response.status(409)
      return { message: `There are not MTP with this id - ${payload.baseMtpId}` }
    }

    const position = await BaseMtp.findBy('position', payload.position)
    if (position) {
      response.status(409)
      return { message: `Position with number - ${position} already exist` }
    }

    const sector = await Sector.find(payload.sectorId)
    if (!sector) {
      response.status(409)
      return { message: `There are not sector with this id - ${payload.sectorId}` }
    }

    const baseProcedure = await BaseProcedure.findBy('title', payload.title)
    if (baseProcedure) {
      response.status(409)
      return { message: `Procedure with title - ${baseProcedure.title} already exist` }
    }

    const newBaseProcedure = await BaseProcedure.create(payload)
    return newBaseProcedure
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const baseProcedure = await BaseProcedure.find(id)

    if (!baseProcedure) {
      response.status(404)
      return { message: 'Not found' }
    }

    return baseProcedure
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const baseProcedure = await BaseProcedure.find(id)

    if (!baseProcedure) {
      response.status(404)
      return { message: 'Not found' }
    }

    const newBaseProcedureSchema = schema.create({
      baseMtpId: schema.number(),
      position: schema.number(),
      title: schema.string({ trim: true }),
      sectorId: schema.number(),
      timeTotal: schema.number(),
      timePerProduct: schema.number(),
      comment: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: newBaseProcedureSchema })

    const baseMtp = await BaseMtp.find(payload.baseMtpId)
    if (!baseMtp) {
      response.status(409)
      return { message: `There are not MTP with this id - ${payload.baseMtpId}` }
    }

    const position = await BaseMtp.findBy('position', payload.position)
    if (position) {
      response.status(409)
      return { message: `Position with number - ${position} already exist` }
    }

    const sector = await Sector.find(payload.sectorId)
    if (!sector) {
      response.status(409)
      return { message: `There are not sector with this id - ${payload.sectorId}` }
    }

    await baseProcedure.merge(payload).save()

    return baseProcedure
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const baseProcedure = await BaseProcedure.find(id)

    if (!baseProcedure) {
      response.status(404)
      return { message: 'Not found' }
    }

    await baseProcedure.delete()
    response.status(204)
  }
}
