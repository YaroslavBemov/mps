import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Procedure from 'App/Models/Procedure'
import Process from 'App/Models/Process'
import Worker from 'App/Models/Worker'

export default class ProcessesController {
  public async index({ }: HttpContextContract) {
    const processes = await Process.all()

    return processes
  }

  public async store({ request, response }: HttpContextContract) {
    const newProcessSchema = schema.create({
      procedureId: schema.number(),
      workerId: schema.number(),
      comment: schema.string.optional({ trim: true })
    })

    const payload = await request.validate({ schema: newProcessSchema })

    const procedure = await Procedure.find(payload.procedureId)
    if (!procedure) {
      response.status(409)
      return { message: `There are not procedure with this id - ${payload.procedureId}` }
    }

    const worker = await Worker.find(payload.workerId)
    if (!worker) {
      response.status(409)
      return { message: `There are not worker with this id - ${payload.workerId}` }
    }

    const process = await Process.findBy('procedure_id', payload.procedureId)
    if (process) {
      response.status(409)
      return { message: `Process with this procedure ID - ${payload.workerId} already exist` }
    }

    const newProcess = await Process.create(payload)
    return newProcess
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const process = await Process.find(id)

    if (!process) {
      response.status(404)
      return { message: 'Not found' }
    }

    return process
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const process = await Process.find(id)

    if (!process) {
      response.status(404)
      return { message: 'Not found' }
    }

    const newProcessSchema = schema.create({
      procedureId: schema.number(),
      workerId: schema.number.optional(),
      timeStart: schema.date.optional(),
      timeFinish: schema.date(),
      comment: schema.string.optional({ trim: true })
    })

    const payload = await request.validate({ schema: newProcessSchema })

    const procedure = await Procedure.find(payload.procedureId)
    if (!procedure) {
      response.status(409)
      return { message: `There are not procedure with this id - ${payload.procedureId}` }
    }

    const worker = await Worker.find(payload.workerId)
    if (!worker) {
      response.status(409)
      return { message: `There are not worker with this id - ${payload.workerId}` }
    }

    await process.merge(payload).save()

    return process
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const process = await Process.find(id)

    if (!process) {
      response.status(404)
      return { message: 'Not found' }
    }

    await process.delete()
    response.status(204)
  }
}
