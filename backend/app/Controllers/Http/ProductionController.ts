import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'
import BaseMtp from 'App/Models/BaseMtp'
import Mtp from 'App/Models/Mtp'
import Procedure from 'App/Models/Procedure'

export default class ProductionController {
  public async start({ request }: HttpContextContract) {
    const newProductionSchema = schema.create({
      orderId: schema.number(),
      baseMtpId: schema.number(),
      serial: schema.number()
    })

    const payload = await request.validate({ schema: newProductionSchema })

    return { production: 'start' }
  }
}

// public async store({ request, response }: HttpContextContract) {
//   const newDepartmentSchema = schema.create({
//     title: schema.string({ trim: true }),
//   })

//   const payload = await request.validate({ schema: newDepartmentSchema })
//   const department = await Department.findBy('title', payload.title)

//   if (department) {
//     response.status(409)
//     return { message: 'Department already exist' }
//   }

//   const newDepartment = await Department.create(payload)
//   return newDepartment
// }
