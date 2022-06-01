import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Worker from 'App/Models/Worker'
import Sector from 'App/Models/Sector'

export default class WorkersController {
  public async index({}: HttpContextContract) {
    const workers = await Worker.query().preload('sector')

    return workers
  }

  public async store({ request, response }: HttpContextContract) {
    const newWorkerSchema = schema.create({
      title: schema.string({ trim: true }),
      sectorId: schema.number(),
    })

    const payload = await request.validate({ schema: newWorkerSchema })
    const sector = await Sector.find(payload.sectorId)

    if (!sector) {
      response.status(409)
      return { message: `There are not sector with this id - ${payload.sectorId}` }
    }

    const worker = await Worker.findBy('title', payload.title)

    if (worker) {
      response.status(409)
      return { message: 'Worker already exist' }
    }

    const newWorker = await Worker.create(payload)

    return newWorker
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const worker = await Worker.find(id)

    if (!worker) {
      response.status(404)
      return { message: 'Not found' }
    }

    await worker.load('sector')

    return worker
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const worker = await Worker.find(id)

    if (!worker) {
      response.status(404)
      return { message: 'Not found' }
    }

    const newWorkerSchema = schema.create({
      title: schema.string({ trim: true }),
      sectorId: schema.number(),
    })

    const payload = await request.validate({ schema: newWorkerSchema })

    const sector = await Sector.find(payload.sectorId)

    if (!sector) {
      response.status(409)
      return { message: `There are not sector with this id - ${payload.sectorId}` }
    }

    await worker.merge(payload).save()

    return worker
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const worker = await Worker.find(id)

    if (!worker) {
      response.status(404)
      return { message: 'Not found' }
    }

    await worker.delete()
    response.status(204)
  }
}
