import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in dev mode and seeder is development
     * only
     */
    if (seeder.default.developmentOnly && !Application.inDev) {
      return
    }

    await new seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../Product'))
    await this.runSeeder(await import('../Status'))
    await this.runSeeder(await import('../Department'))
    await this.runSeeder(await import('../Sector'))
    await this.runSeeder(await import('../Worker'))
    await this.runSeeder(await import('../BaseMtp'))
    await this.runSeeder(await import('../BaseProcedure'))
    await this.runSeeder(await import('../Order'))
    await this.runSeeder(await import('../Mtp'))
    await this.runSeeder(await import('../Procedure'))
    await this.runSeeder(await import('../Process'))
  }
}
