import { makeAutoObservable } from "mobx"
import DepartmentService from '../services/DepartmentService'

interface IDepartment {
  id: number,
  title: string,
  created_at: string,
  updated_at: string
}

export default class DepartmentStore{
  rootStore
  departments: IDepartment[] = []
  department = {} as IDepartment

  constructor(rootStore: any) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async getAllDepartments () {
    try {
      const response = await DepartmentService.getAllDepartments()
      this.setDepartments(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }
 
  async getDepartment (id: any) {
    try {
      const response = await DepartmentService.getDepartment(id)
      this.setDepartment(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }
 
  async storeDepartment (title: string) {
   try {
     await DepartmentService.storeDepartment(title)
     await this.getAllDepartments()
   } catch (error) {
     console.log(error);
     
   }
 }
 
  async updateDepartment (id: any, title: string) {
   try {
     await DepartmentService.updateDepartment(id, title)
   } catch (error) {
     console.log(error);
     
   }
 }
 
  async deleteDepartment (id: any) {
   try {
     await DepartmentService.deleteDepartment(id)
   } catch (error) {
     console.log(error);
     
   }
 }
 
  setDepartments(departments: any) {
   this.departments = departments
  }
 
  setDepartment(department: any) {
   this.department = department
  }
}
