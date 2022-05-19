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

    order.isCreated = true
    await order.save()

    return order
  }

  public async start({ request, response }: HttpContextContract) {
    const newProductionSchema = schema.create({
      orderId: schema.number(),
    })

    const payload = await request.validate({ schema: newProductionSchema })

    const order = await Order.find(payload.orderId)
    if (!order) {
      response.status(404)
      return { message: 'Order not found' }
    }

    if (!order.isCreated) {
      // TODO replace status
      response.status(404)
      return { message: 'Order not created' }
    }

    if (order.isStarted) {
      // TODO replace status
      response.status(404)
      return { message: 'Order already started' }
    }

    await order.load('mtps', (mtpQuery) => {
      mtpQuery.preload('procedures')
    })

    // find procedure with minimum position value in each mtp
    // and change status to waiting
    const proceduresId: number[] = []
    order.mtps.forEach((mtp) => {
      proceduresId.push(mtp.procedures[0].id)
    })

    proceduresId.forEach(async (procedureId) => {
      const procedure = await Procedure.find(procedureId)
      if (procedure) {
        procedure.statusId = 2
        await procedure.save()
      }
    })

    order.isStarted = true
    await order.save()

    return order
  }

  public async change({ request, response }: HttpContextContract) {
    const newProductionSchema = schema.create({
      workerId: schema.number(),
      mtpId: schema.number(),
      statusId: schema.number(),
    })

    const payload = await request.validate({ schema: newProductionSchema })

    const mtp = await Mtp.find(payload.mtpId)
    if (!mtp) {
      response.status(404)
      return { message: 'MTP not found' }
    }

    // find procedure where worker.sector_id === mtp.procedures.sector_id
    // change procedure status
    // create new process with worker ID, procedure ID, status ID
    const procedure = await Procedure.query()
  }
}
