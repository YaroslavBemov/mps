import { makeAutoObservable } from "mobx";
import BaseProcedureService from "../services/BaseProcedureService";
import { IBaseMTP } from "./BaseMTPStore";
import { ISector } from "./SectorStore";
import { IBaseProcedureStoreData } from "../services/BaseProcedureService";

interface IBaseProcedure {
  id: number;
  position: number;
  title: string;
  baseMtp: IBaseMTP;
  sector: ISector;
  time_total: string;
  time_per_product: string;
  comment?: string;
  created_at: string;
  updated_at: string;
}

export default class BaseProcedureStore {
  rootStore;
  baseProcedures: IBaseProcedure[] = [];
  baseProcedure = {} as IBaseProcedure;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getAllBaseProcedures() {
    try {
      const response = await BaseProcedureService.getAllBaseProcedures();
      this.setBaseProcedures(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getBaseProcedure(id: any) {
    try {
      const response = await BaseProcedureService.getBaseProcedure(id);
      this.setBaseProcedure(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async storeBaseProcedure(data: IBaseProcedureStoreData) {
    try {
      await BaseProcedureService.storeBaseProcedure(data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateBaseProcedure(id: any, data: IBaseProcedureStoreData) {
    try {
      await BaseProcedureService.updateBaseProcedure(id, data);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBaseProcedure(id: any) {
    try {
      await BaseProcedureService.deleteBaseProcedure(id);
    } catch (error) {
      console.log(error);
    }
  }

  setBaseProcedures(baseProcedures: IBaseProcedure[]) {
    this.baseProcedures = baseProcedures;
  }

  setBaseProcedure(baseProcedure: IBaseProcedure) {
    this.baseProcedure = baseProcedure;
  }

  get byBaseMTP() {
    return this.baseProcedures.filter((bp) => {
      return bp.baseMtp.id === this.rootStore.baseMTPStore.baseMTP.id;
    });
  }
}
