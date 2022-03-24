import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        title: 'ERVA.357468.001'
      },
      {
        title: 'ERVA.357468.002'
      },
      {
        title: 'ERVA.357468.003'
      }
    ])
  }
}
