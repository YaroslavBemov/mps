import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'

export default class DepartmentsController {
  public async index({}: HttpContextContract) {
    const departments = await Department.all()

    return departments
  }

  public async store({ request, response }: HttpContextContract) {
    const newDepartmentSchema = schema.create({
      title: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: newDepartmentSchema })
    const department = await Department.findBy('title', payload.title)

    if (department) {
      response.status(409)
      return { message: 'Department already exist' }
    }

    const newDepartment = await Department.create(payload)

    return newDepartment
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const department = await Department.find(id)

    if (!department) {
      response.status(404)
      return { message: 'Not found' }
    }

    // await department.load('sectors')

    return department
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const department = await Department.find(id)

    if (!department) {
      response.status(404)
      return { message: 'Not found' }
    }

    const newDepartmentSchema = schema.create({
      title: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: newDepartmentSchema })
    await department.merge(payload).save()

    return department
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const department = await Department.find(id)

    if (!department) {
      response.status(404)
      return { message: 'Not found' }
    }

    await department.delete()
    response.status(204)
  }
}
