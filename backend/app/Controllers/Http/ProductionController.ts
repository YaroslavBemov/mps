import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductionController {
  public async start({ }: HttpContextContract) {
    return { production: 'start' }
  }
}
