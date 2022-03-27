import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Status from 'App/Models/Status'

export default class StatusesController {
  public async index({}: HttpContextContract) {
    const statuses = await Status.all()

    return statuses
  }

  public async store({ request, response }: HttpContextContract) {
    const newStatusSchema = schema.create({
      title: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: newStatusSchema })

    const status = await Status.findBy('title', payload.title)

    if (status) {
      response.status(409)
      return { message: 'Status already exist' }
    }

    const newStatus = await Status.create(payload)
    return newStatus
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const status = await Status.find(id)

    if (!status) {
      response.status(404)
      return { message: 'Not found' }
    }

    return status
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const status = await Status.find(id)

    if (!status) {
      response.status(404)
      return { message: 'Not found' }
    }

    const newStatusSchema = schema.create({
      title: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: newStatusSchema })

    await status.merge(payload).save()

    return status
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const status = await Status.find(id)

    if (!status) {
      response.status(404)
      return { message: 'Not found' }
    }

    await status.delete()
    response.status(204)
  }
}
