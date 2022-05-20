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
  procedureId: number;
  statusId: number;
}

export default class ProductionService {
  static async createMtps(data: ICreateProductionData) {
    return $api.post("production/create", data);
  }

  static async startProduction(data: IStartProductionData) {
    return $api.put("production/start", data);
  }

  static async changeProduction(data: IChangeProductionData) {
    return $api.post("production/change", data);
  }

  static async getTotalProduction(workerId: string) {
    return $api.get(`production/total/?workerId=${workerId}`);
  }

  static async getRecentProcesses() {
    return $api.get("production/recent");
  }

  static async getTodayProduction(workerId: string) {
    return $api.get(`production/today/?workerId=${workerId}`);
  }
}
