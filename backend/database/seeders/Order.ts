import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Order from 'App/Models/Order'

export default class OrderSeeder extends BaseSeeder {
  public async run() {
    await Order.createMany([
      {
        title: 'CRUP1',
        productId: 1,
        count: 3,
        baseMtpId: 1
      },
    ])
  }
}
