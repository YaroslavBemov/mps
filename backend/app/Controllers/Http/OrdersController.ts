import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'
import Product from 'App/Models/Product'

export default class OrdersController {
  public async index({}: HttpContextContract) {
    const orders = await Order.all()

    return orders
  }

  public async store({ request, response }: HttpContextContract) {
    const newOrderSchema = schema.create({
      title: schema.string({ trim: true }),
      productId: schema.number(),
      count: schema.number(),
    })

    const payload = await request.validate({ schema: newOrderSchema })
    const product = await Product.find(payload.productId)

    if (!product) {
      response.status(409)
      return { message: `There are not product with this id - ${payload.productId}` }
    }

    const order = await Order.findBy('title', payload.title)

    if (order) {
      response.status(409)
      return { message: `MTP with title - ${order.title} already exist` }
    }

    const newOrder = await Order.create(payload)
    return newOrder
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const order = await Order.find(id)

    if (!order) {
      response.status(404)
      return { message: 'Not found' }
    }

    return order
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const order = await Order.find(id)

    if (!order) {
      response.status(404)
      return { message: 'Not found' }
    }

    const newOrderSchema = schema.create({
      title: schema.string({ trim: true }),
      productId: schema.number(),
      count: schema.number(),
    })

    const payload = await request.validate({ schema: newOrderSchema })

    const product = await Product.find(payload.productId)

    if (!product) {
      response.status(409)
      return { message: `There are not product with this id - ${payload.productId}` }
    }

    await order.merge(payload).save()

    return order
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const order = await Order.find(id)

    if (!order) {
      response.status(404)
      return { message: 'Not found' }
    }

    await order.delete()
    response.status(204)
  }
}
