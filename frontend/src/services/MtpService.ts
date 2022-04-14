import $api from "../http";
import { IMtpStoreData } from '../store/MtpStore'

export default class MtpService {
  static async getAllMtps() {
    return $api.get("mtps");
  }

  static async getMtp(id: any) {
    return $api.get(`mtps/${id}`);
  }

  static async storeMtp(data: IMtpStoreData) {
    return $api.post("mtps", data);
  }

  static async updateMtp(id: any, data: IMtpStoreData) {
    return $api.put(`mtps/${id}`, data);
  }

  static async deleteMtp(id: any) {
    return $api.delete(`mtps/${id}`);
  }
}
