import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Department from 'App/Models/Department'

export default class DepartmentSeeder extends BaseSeeder {
  public async run() {
    await Department.createMany([
      {
        title: 'PKRV',
      },
    ])
  }
}
