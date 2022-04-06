import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
// TODO rework
export default class AuthController {
  public async login({ auth, request, response }) {
    // const name = request.input('name')
    // const password = request.input('password')

    // try {
    //   const token = await auth.use('api').attempt(name, password, {
    //     expiresIn: '7days'
    //   })
    //   return token
    // } catch {
    //   return response.badRequest('Invalid credentials')
    // }

    const name = request.input('name')
    const password = request.input('password')

    // Lookup user manually
    const user = await User.query().where('name', name).firstOrFail()

    // Verify password
    // if (!(await Hash.verify(user.password, password))) {
    //   return response.badRequest('Invalid credentials')
    // }

    if (user.password !== password) {
      return response.badRequest('Invalid credentials')
    }

    // Generate token
    const token = await auth.use('api').generate(user, {
      expiresIn: '7days',
    })
    return { ...token }
  }

  public async logout({ auth }) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }

  public async reg({ request }: HttpContextContract) {
    const name = request.input('name')
    const password = request.input('password')

    const user = await User.create({ name, password })
    return user
  }

  public async test({ request }: HttpContextContract) {
    const name = request.input('name')
    // const password = request.input('password')

    const user = await User.query().where('name', name).firstOrFail()
    return user
  }

  public async refresh({ auth }) {
    await auth.use('api').authenticate()
    return auth.use('api').user!
  }
}
