import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Sector from 'App/Models/Sector'

export default class SectorSeeder extends BaseSeeder {
  public async run() {
    await Sector.createMany([
      {
        title: 'Preparation',
        step: 10,
        departmentId: 1,
      },
      {
        title: 'SMT',
        step: 20,
        departmentId: 1,
      },
      {
        title: 'AOI',
        step: 30,
        departmentId: 1,
      },
    ])
  }
}
