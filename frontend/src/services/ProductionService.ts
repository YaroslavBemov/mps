import $api from "../http";

interface ICreateProductionData {
  orderId: number;
  serial: number;
}

interface IStartProductionData {
  orderId: number;
}

export default class ProductionService {
  static async createMtps(data: ICreateProductionData) {
    return $api.post("production/create", data);
  }

  static async startProduction(data: IStartProductionData) {
    return $api.put("production/start", data);
  }
}
