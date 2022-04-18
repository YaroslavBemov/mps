import $api from '../http'

interface IStartProductionData {
  orderId: number
  serial: number
}

export default class ProductionService {
  static async startProduction(data: IStartProductionData) {
    return $api.post('production/start', data)
  }
}
