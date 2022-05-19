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
        statusId: 1,
      },
      {
        mtpId: 1,
        position: 20,
        title: 'SMT',
        sectorId: 2,
        statusId: 1,
      },
      {
        mtpId: 1,
        position: 30,
        title: 'AOI',
        sectorId: 3,
        statusId: 1,
      },
      {
        mtpId: 2,
        position: 10,
        title: 'Complectation',
        sectorId: 1,
        statusId: 1,
      },
      {
        mtpId: 2,
        position: 20,
        title: 'SMT',
        sectorId: 2,
        statusId: 1,
      },
      {
        mtpId: 2,
        position: 30,
        title: 'AOI',
        sectorId: 3,
        statusId: 1,
      },
      {
        mtpId: 3,
        position: 10,
        title: 'Complectation',
        sectorId: 1,
        statusId: 1,
      },
      {
        mtpId: 3,
        position: 20,
        title: 'SMT',
        sectorId: 2,
        statusId: 1,
      },
      {
        mtpId: 3,
        position: 30,
        title: 'AOI',
        sectorId: 3,
        statusId: 1,
      },
      {
        mtpId: 4,
        position: 10,
        title: 'Complectation',
        sectorId: 1,
        statusId: 1,
      },
      {
        mtpId: 4,
        position: 20,
        title: 'SMT',
        sectorId: 2,
        statusId: 1,
      },
      {
        mtpId: 4,
        position: 30,
        title: 'AOI',
        sectorId: 3,
        statusId: 1,
      },
    ])
  }
}
