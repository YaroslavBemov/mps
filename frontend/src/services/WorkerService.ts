import $api from "../http";
import { IWorkerStoreData } from "../store/WorkerStore";

export default class WorkerService {
  static async getAllWorkers() {
    return $api.get("workers");
  }

  static async getWorker(id: any) {
    return $api.get(`workers/${id}`);
  }

  static async storeWorker(data: IWorkerStoreData) {
    return $api.post("workers", data);
  }

  static async updateWorker(id: any, data: IWorkerStoreData) {
    return $api.put(`workers/${id}`, data);
  }

  static async deleteWorker(id: any) {
    return $api.delete(`workers/${id}`);
  }
}
