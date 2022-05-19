import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Mtp from 'App/Models/Mtp'

export default class MtpSeeder extends BaseSeeder {
  public async run() {
    await Mtp.createMany([
      {
        orderId: 1,
        serial: 1,
      },
      {
        orderId: 1,
        serial: 2,
      },
      {
        orderId: 1,
        serial: 3,
      },
      {
        orderId: 2,
        serial: 4,
      },
    ])
  }
}
