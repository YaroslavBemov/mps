import $api from "../http";

export default class ProductService {
  static async getAll() {
    return $api.get('products')
  }

  static async getProduct(id: any) {
    return $api.get(`products/${id}`)
  }
}
