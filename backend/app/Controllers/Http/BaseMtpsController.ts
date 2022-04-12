import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import BaseMtp from 'App/Models/BaseMtp'
import Product from 'App/Models/Product'

export default class BaseMtpsController {
  public async index({}: HttpContextContract) {
    const baseMtps = await BaseMtp.query().preload('product')

    return baseMtps
  }

  public async store({ request, response }: HttpContextContract) {
    const newBaseMtpSchema = schema.create({
      title: schema.string({ trim: true }),
      productId: schema.number(),
    })

    const payload = await request.validate({ schema: newBaseMtpSchema })
    const product = await Product.find(payload.productId)

    if (!product) {
      response.status(409)
      return { message: `There are not product with this id - ${payload.productId}` }
    }

    if (product.title === payload.title) {
      response.status(409)
      return { message: `MTP with title - ${payload.title} already exist` }
    }

    const newBaseMtp = await BaseMtp.create(payload)
    return newBaseMtp
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const baseMtp = await BaseMtp.find(id)

    if (!baseMtp) {
      response.status(404)
      return { message: 'Not found' }
    }

    await baseMtp.load('product')

    return baseMtp
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const baseMtp = await BaseMtp.find(id)

    if (!baseMtp) {
      response.status(404)
      return { message: 'Not found' }
    }

    const newBaseMtpSchema = schema.create({
      title: schema.string({ trim: true }),
      productId: schema.number(),
    })

    const payload = await request.validate({ schema: newBaseMtpSchema })

    const product = await Product.find(payload.productId)

    if (!product) {
      response.status(409)
      return { message: `There are not product with this id - ${payload.productId}` }
    }

    await baseMtp.merge(payload).save()

    return baseMtp
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const baseMtp = await BaseMtp.find(id)

    if (!baseMtp) {
      response.status(404)
      return { message: 'Not found' }
    }

    await baseMtp.delete()
    response.status(204)
  }
}
