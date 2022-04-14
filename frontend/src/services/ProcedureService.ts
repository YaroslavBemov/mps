import $api from '../http'
import { IProcedureStoreData } from '../store/ProcedureStore'

export default class ProcedureService {
  static async getAllProcedures() {
    return $api.get('procedures')
  }

  static async getProcedure(id: any) {
    return $api.get(`procedures/${id}`)
  }

  static async storeProcedure(data: IProcedureStoreData) {
    return $api.post('procedures', data)
  }

  static async updateProcedure(id: any, data: IProcedureStoreData) {
    return $api.put(`procedures/${id}`, data)
  }

  static async deleteProcedure(id: any) {
    return $api.delete(`procedures/${id}`)
  }
}
