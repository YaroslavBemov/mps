import $api from "../http";

export default class BaseMTPService {
  static async getAllBaseMTPs() {
    return $api.get("base-mtps");
  }

  static async getBaseMTP(id: any) {
    return $api.get(`base-mtps/${id}`);
  }

  static async storeBaseMTP(title: string, productId: number) {
    return $api.post("base-mtps", { title, productId });
  }

  static async updateBaseMTP(id: any, title: string, productId: number) {
    return $api.put(`base-mtps/${id}`, { title, productId });
  }

  static async deleteBaseMTP(id: any) {
    return $api.delete(`base-mtps/${id}`);
  }
}
