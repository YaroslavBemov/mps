import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Procedure from 'App/Models/Procedure'

export default class ProcedureSeeder extends BaseSeeder {
  public async run() {
    await Procedure.createMany([
      {
        mtpId: 1,
        position: 10,
        title: 'Complectation',
        sectorId: 1,
        comment: 'Text text text...',
      },
    ])
  }
}
