import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'
import BaseMtp from 'App/Models/BaseMtp'
import Mtp from 'App/Models/Mtp'
import Procedure from 'App/Models/Procedure'
import Process from 'App/Models/Process'
import Worker from 'App/Models/Worker'

interface TodayProduction {
  time: string
  amount: number
}

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
      procedureId: schema.number(),
      statusId: schema.number(),
    })

    const payload = await request.validate({ schema: newProductionSchema })

    const prodecure = await Procedure.find(payload.procedureId)
    if (!prodecure) {
      response.status(404)
      return { message: 'MTP not found' }
    }

    prodecure.statusId = payload.statusId
    await prodecure.save()

    if (payload.statusId === 5) {
      const newProcedure = await Procedure.query()
        .where('id', payload.procedureId)
        .preload('mtp', (mtpQuery) => {
          mtpQuery.preload('procedures')
        })

      const sortedProcedures = newProcedure[0].mtp.procedures.sort((a, b) => {
        return a.position - b.position
      })

      const index = sortedProcedures.findIndex((procedure) => {
        return procedure.id === payload.procedureId
      })

      if (index > -1) {
        if (index + 1 < sortedProcedures.length) {
          const id = sortedProcedures[index + 1].id
          const nextProcedure = await Procedure.find(id)

          if (nextProcedure) {
            nextProcedure.statusId = 2
            await nextProcedure.save()
          }
        }
      }
    }

    const newProcess = await Process.createMany([
      {
        workerId: payload.workerId,
        procedureId: payload.procedureId,
        statusId: payload.statusId,
      },
    ])

    return newProcess
  }

  public async total({ request, response }: HttpContextContract) {
    const { workerId: qsWorker } = request.qs()

    if (!qsWorker) {
      response.status(404)
      return { message: 'Worker not found' }
    }

    const worker = await Worker.find(qsWorker)
    if (!worker) {
      response.status(404)
      return { message: 'Worker not found' }
    }

    const workerSector = worker.sectorId

    const completedProcedures = await Procedure.query()
      .where('sector_id', workerSector)
      .andWhere('status_id', 5)
      .andWhereRaw("to_char(updated_at, 'YYYY-MM-DD')  = to_char( now(), 'YYYY-MM-DD' )")
      .count('* as total')

    return { total: completedProcedures[0].$extras.total }
  }

  public async recent() {
    const recentProcesses = await Process.query()
      .orderBy('created_at', 'desc')
      .preload('worker', (workerQuery) => {
        workerQuery.preload('sector')
      })
      .preload('procedure', (procedureQuery) => {
        procedureQuery
          .preload('mtp', (mtpQuery) => {
            mtpQuery.preload('order', (orderQuery) => {
              orderQuery.preload('product')
            })
          })
          .preload('status')
      })
      .limit(5)

    const response = recentProcesses.map((process) => {
      return {
        id: process.id,
        date: process.createdAt.toFormat('dd LLL, T'),
        sector: process.worker.sector.title,
        name: process.worker.title,
        product: process.procedure.mtp.order.product.title,
        status: process.procedure.status.title,
      }
    })

    return response
  }

  public async today({ request, response }: HttpContextContract) {
    const { workerId: qsWorker } = request.qs()

    if (!qsWorker) {
      response.status(404)
      return { message: 'Worker not found' }
    }

    const worker = await Worker.find(qsWorker)
    if (!worker) {
      response.status(404)
      return { message: 'Worker not found' }
    }

    const workerSector = worker.sectorId

    const completedProcedures = await Procedure.query()
      .where('sector_id', workerSector)
      .andWhere('status_id', 5)
      .andWhereRaw("to_char(updated_at, 'YYYY-MM-DD')  = to_char(now(), 'YYYY-MM-DD' )")

    const todayProduction: TodayProduction[] = []
    for (let index = 0; index <= 24; index = index + 3) {
      const filtered = completedProcedures.filter((procedure) => {
        const time = +procedure.updatedAt.toFormat('H')
        return time >= index && time < index + 3
      })

      todayProduction.push({
        time: String(`${index}:00`),
        amount: filtered.length,
      })
    }

    return todayProduction
  }
}
