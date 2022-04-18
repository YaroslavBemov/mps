import $api from "../http";

export interface IOrderStoreData {
  title: string
  productId: number
  count: number
  baseMtpId: number
}

export default class OrderService {
  static async getAllOrders() {
    return $api.get("orders");
  }

  static async getOrder(id: any) {
    return $api.get(`orders/${id}`);
  }

  static async storeOrder(data: IOrderStoreData) {
    return $api.post("orders", data);
  }

  static async updateOrder(id: any, data: IOrderStoreData) {
    return $api.put(`orders/${id}`, data);
  }

  static async deleteOrder(id: any) {
    return $api.delete(`orders/${id}`);
  }
}
