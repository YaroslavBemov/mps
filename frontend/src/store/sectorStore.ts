import { makeAutoObservable } from "mobx"
import SectorService from '../services/SectorService'

interface ISector {
  id: number,
  title: string,
  step: number,
  department_id: number,
  created_at: string,
  updated_at: string
}

export default class SectorStore{
  rootStore
  sectors: ISector[] = []
  sector = {} as ISector

  constructor(rootStore: any) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async getAllSectors () {
    try {
      const response = await SectorService.getAllSectors()
      this.setSectors(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }
 
  async getSector (id: any) {
    try {
      const response = await SectorService.getSector(id)
      this.setSector(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }
 
  async storeSector (title: string, step: number, departmentId: number) {
   try {
     await SectorService.storeSector(title, step, departmentId)
     await this.getAllSectors()
   } catch (error) {
     console.log(error);
     
   }
 }
 
  async updateSector (id: any, title: string, step: number, departmentId: number) {
   try {
     await SectorService.updateSector(id, title, step, departmentId)
   } catch (error) {
     console.log(error);
     
   }
 }
 
  async deleteSector (id: any) {
   try {
     await SectorService.deleteSector(id)
   } catch (error) {
     console.log(error);
     
   }
 }
 
  setSectors(sectors: any) {
   this.sectors = sectors
  }
 
  setSector(sector: any) {
   this.sector = sector
  }
}
