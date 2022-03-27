import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BaseMtp from 'App/Models/BaseMtp'

export default class BaseMtpSeeder extends BaseSeeder {
  public async run() {
    await BaseMtp.createMany([
      {
        title: 'v1',
        productId: 1,
      },
    ])
  }
}
