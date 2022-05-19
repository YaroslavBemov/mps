import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Process from 'App/Models/Process'

export default class ProcessSeeder extends BaseSeeder {
  public async run() {
    await Process.createMany([
      {
        workerId: 1,
        procedureId: 1,
        statusId: 2,
        comment: 'Text text text...',
      },
    ])
  }
}
