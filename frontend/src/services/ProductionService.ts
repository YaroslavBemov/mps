import $api from "../http";

interface IStartProductionData {
  orderId: number;
  serial: number;
}

export default class ProductionService {
  static async createMtps(data: IStartProductionData) {
    return $api.post("production/create", data);
  }
}
