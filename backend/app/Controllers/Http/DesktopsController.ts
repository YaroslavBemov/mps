import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mtp from 'App/Models/Mtp'
import Worker from 'App/Models/Worker'

export default class DesktopsController {
  public async index({ request, response }: HttpContextContract) {
    // show list mtps where
    // worker.sector_id === procedure.sector_id && procedure.status_id === 4 ('stopped)
    // worker.sector_id === procedure.sector_id && procedure.status_id === 3 ('work_in_progress)
    // worker.sector_id === procedure.sector_id && procedure.status_id === 2 ('waiting)
    const { worker: qsWorker } = request.qs()

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

    const stoppedMtps = await Mtp.query()
      .whereHas('procedures', (proceduresQuery) => {
        proceduresQuery.where('sector_id', workerSector).andWhere('status_id', 4)
      })
      .preload('order')
      .preload('procedures', (proceduresQuery) => {
        proceduresQuery.where('status_id', 4)
      })

    const wipMtps = await Mtp.query()
      .whereHas('procedures', (proceduresQuery) => {
        proceduresQuery.where('sector_id', workerSector).andWhere('status_id', 3)
      })
      .preload('order')
      .preload('procedures', (proceduresQuery) => {
        proceduresQuery.where('status_id', 3)
      })

    const waitingMtps = await Mtp.query()
      .whereHas('procedures', (proceduresQuery) => {
        proceduresQuery.where('sector_id', workerSector).andWhere('status_id', 2)
      })
      .preload('order')
      .preload('procedures', (proceduresQuery) => {
        proceduresQuery.where('status_id', 2)
      })

    return {
      stoppedMtps,
      wipMtps,
      waitingMtps,
    }
  }
}
