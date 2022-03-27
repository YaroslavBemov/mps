import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BaseProcedure from 'App/Models/BaseProcedure'

export default class BaseProcedureSeeder extends BaseSeeder {
  public async run() {
    await BaseProcedure.createMany([
      {
        baseMtpId: 1,
        position: 10,
        title: 'Комплектация',
        sectorId: 1,
        timeTotal: 3,
        timePerProduct: 0,
        comment: 'Some comment',
      },
      {
        baseMtpId: 1,
        position: 20,
        title: 'Установка компонентов',
        sectorId: 2,
        timeTotal: 3,
        timePerProduct: 1,
        comment: 'Some comment',
      },
      {
        baseMtpId: 1,
        position: 30,
        title: 'Проверка',
        sectorId: 3,
        timeTotal: 1,
        timePerProduct: 1,
        comment: 'Some comment',
      },
    ])
  }
}
