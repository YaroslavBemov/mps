import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'
import BaseMtp from 'App/Models/BaseMtp'
import Mtp from 'App/Models/Mtp'
import Procedure from 'App/Models/Procedure'

export default class ProductionController {
  public async create({ request, response }: HttpContextContract) {
    const newProductionSchema = schema.create({
      orderId: schema.number(),
      serial: schema.number(),
    })

    const payload = await request.validate({ schema: newProductionSchema })

    const order = await Order.find(payload.orderId)
    if (!order) {
      response.status(404)
      return { message: 'Order not found' }
    }

    if (order.isCreated) {
      // TODO replace status
      response.status(404)
      return { message: 'Order already started' }
    }

    const baseMtp = await BaseMtp.find(order.baseMtpId)
    if (!baseMtp) {
      response.status(404)
      return { message: 'Base MTP not found' }
    }
    await baseMtp.load('baseProcedures')

    // order
    //
    // id: 1
    // base_mtp_id: 1
    // count: 3
    // product_id: 1
    // title: "CRUP1"

    // mtp
    //
    // order_id
    // serial

    // procedure
    //
    // mtp_id
    // position
    // title
    // sector_id

    const orderId = payload.orderId
    let serial = payload.serial

    // create MTPs with serial and orderID
    for (let i = 0; i < order.count; i++) {
      const mtp = await Mtp.create({
        orderId,
        serial,
      })
      serial++

      // create procedures with mtp_id, position, title, sector_id
      for (const procedure of baseMtp.baseProcedures) {
        await Procedure.create({
          mtpId: mtp.id,
          position: procedure.position,
          title: procedure.title,
          sectorId: procedure.sectorId,
        })
      }
    }

    order.isStarted = true
    await order.save()

    return order
  }
}
