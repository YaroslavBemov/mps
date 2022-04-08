import $api from '../http'

export default class DepartmentService {
  static async getAllDepartments() {
    return $api.get('departments')
  }

  static async getDepartment(id: any) {
    return $api.get(`departments/${id}`)
  }

  static async storeDepartment(title: string) {
    return $api.post('departments', {title})
  }

  static async updateDepartment(id: any, title: string) {
    return $api.put(`departments/${id}`, {title})
  }

  static async deleteDepartment(id: any) {
    return $api.delete(`departments/${id}`)
  }
}
