// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DesktopsController {
  public async index() {
    return { iam: 'working' }
  }
}
