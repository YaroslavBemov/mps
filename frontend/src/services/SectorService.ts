import $api from '../http'

export default class SectorService {
  static async getAllSectors() {
    return $api.get('sectors')
  }

  static async getSector(id: any) {
    return $api.get(`sectors/${id}`)
  }

  static async storeSector(title: string, step: number, departmentId: number) {
    return $api.post('sectors', { title, step, departmentId })
  }

  static async updateSector(id: any, title: string, step: number, departmentId: number) {
    return $api.put(`sectors/${id}`, { title, step, department_id: departmentId })
  }

  static async deleteSector(id: any) {
    return $api.delete(`sectors/${id}`)
  }
}
