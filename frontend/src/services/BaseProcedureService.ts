import $api from "../http";

export interface IBaseProcedureStoreData {
  position: number;
  title: string;
  baseMtpId: number;
  sectorId: number;
  timeTotal: string;
  timePerProduct: string;
  comment?: string;
}

export default class BaseProcedureService {
  static async getAllBaseProcedures() {
    return $api.get("base-procedures");
  }

  static async getBaseProcedure(id: any) {
    return $api.get(`base-procedures/${id}`);
  }

  static async storeBaseProcedure(data: IBaseProcedureStoreData) {
    return $api.post("base-procedures", data);
  }

  static async updateBaseProcedure(id: any, data: IBaseProcedureStoreData) {
    return $api.put(`base-procedures/${id}`, data);
  }

  static async deleteBaseProcedure(id: any) {
    return $api.delete(`base-procedures/${id}`);
  }
}
