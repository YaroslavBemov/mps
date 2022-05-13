import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Mtp from 'App/Models/Mtp'
import Order from 'App/Models/Order'

export default class MtpsController {
  public async index({ }: HttpContextContract) {
    const mtps = await Mtp.query().preload('order').preload('procedures')

    return mtps
  }

  public async store({ request, response }: HttpContextContract) {
    const newMtpSchema = schema.create({
      orderId: schema.number(),
      serial: schema.number(),
    })

    const payload = await request.validate({ schema: newMtpSchema })
    const order = await Order.find(payload.orderId)

    if (!order) {
      response.status(409)
      return { message: `There are not order with this id - ${payload.orderId}` }
    }

    const mtpWithPayloadSerial = await Mtp.query()
      .where('order_id', payload.orderId)
      .andWhere('serial', payload.serial)
      .first()

    if (mtpWithPayloadSerial) {
      response.status(409)
      return { message: `MTP with serial - ${payload.serial} already exist in this order` }
    }

    const newMtp = await Mtp.create(payload)
    return newMtp
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const mtp = await Mtp.find(id)

    if (!mtp) {
      response.status(404)
      return { message: 'Not found' }
    }

    await mtp.load('order')
    await mtp.load('procedures')

    return mtp
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const mtp = await Mtp.find(id)

    if (!mtp) {
      response.status(404)
      return { message: 'Not found' }
    }

    const newMtpSchema = schema.create({
      orderId: schema.number(),
      serial: schema.number(),
    })

    const payload = await request.validate({ schema: newMtpSchema })

    const order = await Order.find(payload.orderId)

    if (!order) {
      response.status(409)
      return { message: `There are not order with this id - ${payload.orderId}` }
    }

    const mtpWithPayloadSerial = await Mtp.query()
      .where('orderId', payload.orderId)
      .andWhere('serial', payload.serial)
      .first()

    if (mtpWithPayloadSerial) {
      response.status(409)
      return { message: `MTP with serial - ${mtp.serial} already exist in this order` }
    }

    await mtp.merge(payload).save()

    return mtp
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const mtp = await Mtp.find(id)

    if (!mtp) {
      response.status(404)
      return { message: 'Not found' }
    }

    await mtp.delete()
    response.status(204)
  }
}
