import $api from '../http'
import { IProcessStoreData } from '../store/ProcessStore'

export default class ProcessService {
  static async getAllProcesses() {
    return $api.get('processes')
  }

  static async getProcess(id: any) {
    return $api.get(`processes/${id}`)
  }

  static async storeProcess(data: IProcessStoreData) {
    return $api.post('processes', data)
  }

  static async updateProcess(id: any, data: IProcessStoreData) {
    return $api.put(`processes/${id}`, data)
  }

  static async deleteProcess(id: any) {
    return $api.delete(`processes/${id}`)
  }
}
