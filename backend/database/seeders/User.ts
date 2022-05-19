import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class StatusSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'yb',
        password: '123',
      },
    ])
  }
}
