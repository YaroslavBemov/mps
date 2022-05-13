import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Mtp from 'App/Models/Mtp'
import Procedure from 'App/Models/Procedure'
import Sector from 'App/Models/Sector'
import Status from 'App/Models/Status'

export default class ProceduresController {
  public async index({ }: HttpContextContract) {
    const procedures = await Procedure.query().preload('sector').preload('status')

    return procedures
  }

  public async store({ request, response }: HttpContextContract) {
    const newProcedureSchema = schema.create({
      mtpId: schema.number(),
      position: schema.number(),
      title: schema.string({ trim: true }),
      sectorId: schema.number(),
      comment: schema.string.optional({ trim: true })
    })

    const payload = await request.validate({ schema: newProcedureSchema })

    const mtp = await Mtp.find(payload.mtpId)
    if (!mtp) {
      response.status(409)
      return { message: `There are not MTP with this id - ${payload.mtpId}` }
    }

    const sector = await Sector.find(payload.sectorId)
    if (!sector) {
      response.status(409)
      return { message: `There are not sector with this id - ${payload.mtpId}` }
    }

    const procedureWithPayloadPosition = await Procedure.query()
      .where('mtp_id', payload.mtpId)
      .andWhere('position', payload.position)
      .first()

    if (procedureWithPayloadPosition) {
      response.status(409)
      return { message: `Procedure with position - ${payload.position} already exist in this MTP` }
    }

    const procedure = await Procedure.create(payload)
    return procedure
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const procedure = await Procedure.find(id)

    if (!procedure) {
      response.status(404)
      return { message: 'Not found' }
    }

    await procedure.load('sector')
    await procedure.load('status')

    return procedure
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const procedure = await Procedure.find(id)

    if (!procedure) {
      response.status(404)
      return { message: 'Not found' }
    }

    const newProcedureSchema = schema.create({
      mtpId: schema.number(),
      position: schema.number(),
      title: schema.string({ trim: true }),
      sectorId: schema.number(),
      statusId: schema.number(),
      comment: schema.string({ trim: true })
    })

    const payload = await request.validate({ schema: newProcedureSchema })

    const mtp = await Mtp.find(payload.mtpId)
    if (!mtp) {
      response.status(409)
      return { message: `There are not MTP with this id - ${payload.mtpId}` }
    }

    const sector = await Sector.find(payload.sectorId)
    if (!sector) {
      response.status(409)
      return { message: `There are not sector with this id - ${payload.mtpId}` }
    }

    const status = await Status.find(payload.statusId)
    if (!status) {
      response.status(409)
      return { message: `There are not status with this id - ${payload.mtpId}` }
    }

    const procedureWithPayloadPosition = await Procedure.query()
      .where('mtp_id', payload.mtpId)
      .andWhere('position', payload.position)
      .first()

    if (procedureWithPayloadPosition) {
      response.status(409)
      return { message: `Procedure with position - ${payload.position} already exist in this MTP` }
    }

    await procedure.merge(payload).save()

    return procedure
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const procedure = await Procedure.find(id)

    if (!procedure) {
      response.status(404)
      return { message: 'Not found' }
    }

    await procedure.delete()
    response.status(204)
  }
}
