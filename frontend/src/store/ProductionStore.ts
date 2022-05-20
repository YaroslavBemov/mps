import { makeAutoObservable } from "mobx";
import ProductionService from "../services/ProductionService";

export interface ITodayProduction {
  time: string;
  amount: number;
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
  status: string;
}

export default class ProductionStore {
  rootStore;
  todayProduction: ITodayProduction[] = [];
  totalProduction = {} as ITotalProduction;
  recentProcesses: IRecentProcesses[] = [];

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

  async getRecentProcesses() {
    try {
      const response = await ProductionService.getRecentProcesses();
      this.setRecentProcesses(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  setRecentProcesses(processes: IRecentProcesses[]) {
    this.recentProcesses = processes;
  }

  async getTodayProduction() {
    try {
      const { roleId } = this.rootStore.authStore;
      const response = await ProductionService.getTodayProduction(roleId);
      this.setTodayProduction(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  setTodayProduction(today: ITodayProduction[]) {
    this.todayProduction = today;
  }
}
