import { makeAutoObservable } from "mobx";
import DesktopService from "../services/DesktopService";

export interface IDesktop {}

export default class DesktopStore {
  rootStore;
  desktops: IDesktop[] = [];
  desktop = {} as IDesktop;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getAllDesktops() {
    try {
      const response = await DesktopService.getAllDesktops();
      this.setDesktops(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // async getDepartment(id: any) {
  //   try {
  //     const response = await DepartmentService.getDepartment(id);
  //     this.setDepartment(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async storeDepartment(title: string) {
  //   try {
  //     await DepartmentService.storeDepartment(title);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async updateDepartment(id: any, title: string) {
  //   try {
  //     await DepartmentService.updateDepartment(id, title);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async deleteDepartment(id: any) {
  //   try {
  //     await DepartmentService.deleteDepartment(id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  setDesktops(desktops: any) {
    this.desktops = desktops;
  }

  setDesktop(desktop: any) {
    this.desktop = desktop;
  }
}
