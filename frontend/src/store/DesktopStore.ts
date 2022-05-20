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
      const { roleId } = this.rootStore.authStore;
      const response = await DesktopService.getDesktop(roleId);
      this.setDesktop(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  setDesktops(desktops: any) {
    this.desktops = desktops;
  }

  setDesktop(desktop: any) {
    this.desktop = desktop;
  }
}
