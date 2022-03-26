import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Worker from 'App/Models/Worker'

export default class WorkerSeeder extends BaseSeeder {
  public async run() {
    await Worker.createMany([
      {
        title: 'Worker 1',
        sectorId: 1,
      },
      {
        title: 'Worker 2',
        sectorId: 2,
      },
      {
        title: 'Worker 3',
        sectorId: 2,
      },
      {
        title: 'Worker 4',
        sectorId: 3,
      },
    ])
  }
}
