import $api from "../http";

interface ICreateProductionData {
  orderId: number;
  serial: number;
}

interface IStartProductionData {
  orderId: number;
}

export interface IChangeProductionData {
  workerId: number;
  mtpId: number;
  statusId: number;
  newStatus: number;
}

export default class ProductionService {
  static async createMtps(data: ICreateProductionData) {
    return $api.post("production/create", data);
  }

  static async startProduction(data: IStartProductionData) {
    return $api.put("production/start", data);
  }

  static async changeProduction(data: IChangeProductionData) {
    return $api.put("production/change", data);
  }
}
