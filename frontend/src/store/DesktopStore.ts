import { makeAutoObservable } from "mobx";
import DesktopService from "../services/DesktopService";
import { IProcedure } from "./ProcedureStore";

export interface IDesktop {
  stoppedMtps: IProcedure[];
  wipMtps: IProcedure[];
  waitingMtps: IProcedure[];
}

export default class DesktopStore {
  rootStore;
  desktops: IDesktop[] = [];
  desktop = {} as IDesktop;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getDesktop() {
    try {
      const role = this.rootStore.authStore.role;
      let workerId = "10";
      switch (role) {
        case "compl":
          workerId = "1";
          break;
        case "oper":
          workerId = "2";
          break;
        case "otk":
          workerId = "3";
          break;

        default:
          break;
      }
      const response = await DesktopService.getDesktop(workerId);
      this.setDesktop(response.data);
      console.log(response.data);
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
