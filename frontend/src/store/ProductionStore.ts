import { makeAutoObservable } from "mobx";
import ProductionService from "../services/ProductionService";

export interface ITodayProduction {
  time: string;
  amount: number | undefined;
}

export interface ITotalProduction {
  total: string;
}

export interface IRecentProcesses {
  id: number;
  date: string;
  sector: string;
  name: string;
  product: string;
}

export default class ProductionStore {
  rootStore;
  todayProduction = {} as ITodayProduction;
  totalProduction = {} as ITotalProduction;
  recentProcesses = {} as IRecentProcesses;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getTotalProduction() {
    try {
      const { roleId } = this.rootStore.authStore;

      const response = await ProductionService.getTotalProduction(roleId);
      this.setTotalProduction(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  setTotalProduction(total: ITotalProduction) {
    this.totalProduction = total;
  }

  // setDesktop(desktop: any) {
  //   this.desktop = desktop;
  // }
}
