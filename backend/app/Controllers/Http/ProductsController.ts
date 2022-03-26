import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'

export default class ProductsController {
  public async index({}: HttpContextContract) {
    const products = await Product.all()

    return products
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateProductValidator)
    const product = await Product.findBy('title', payload.title)

    if (product) {
      response.status(409)
      return { message: 'Product already exist' }
    }

    const newProduct = await Product.create(payload)
    return newProduct
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const product = await Product.find(id)

    if (!product) {
      response.status(404)
      return { message: 'Not found' }
    }

    return product
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const product = await Product.find(id)

    if (!product) {
      response.status(404)
      return { message: 'Not found' }
    }

    const payload = await request.validate(CreateProductValidator)
    await product.merge(payload).save()

    return product
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const product = await Product.find(id)

    if (!product) {
      response.status(404)
      return { message: 'Not found' }
    }

    await product.delete()
    response.status(204)
  }
}
