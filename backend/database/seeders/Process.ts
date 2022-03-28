import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Process from 'App/Models/Process'

export default class ProcessSeeder extends BaseSeeder {
  public async run() {
    await Process.createMany([
      {
        procedureId: 1,
        workerId: 1,
        comment: 'Text text text...',
      },
    ])
  }
}
