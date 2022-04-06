import $api from "../http";

export default class ProductService {
  static async getAll() {
    return $api.get('products')
  }
}
