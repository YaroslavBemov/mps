import $api from "../http";

export default class ProductService {
  static async getAllProducts() {
    return $api.get("products");
  }

  static async getProduct(id: any) {
    return $api.get(`products/${id}`);
  }

  static async storeProduct(title: string) {
    return $api.post("products", { title });
  }

  static async updateProduct(id: any, title: string) {
    return $api.put(`products/${id}`, { title });
  }

  static async deleteProduct(id: any) {
    return $api.delete(`products/${id}`);
  }
}
