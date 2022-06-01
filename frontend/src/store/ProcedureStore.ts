import { makeAutoObservable } from "mobx";
import ProcedureService from "../services/ProcedureService";
import { ISector } from "./SectorStore";

export interface IStatus {
  id: number;
  title: string;
}

export interface IProcedure {
  id: number;
  mtp_id: number;
  position: number;
  title: string;
  sector_id: number;
  sector: ISector;
  status_id: number;
  status: IStatus;
  comment?: string;
  created_at: string;
  updated_at: string;
}

export interface IProcedureStoreData {
  mtp_id: number;
  position: number;
  title: string;
  sector_id: number;
  status_id: number;
  comment?: string;
}

export default class ProcedureStore {
  rootStore;
  procedures: IProcedure[] = [];
  procedure = {} as IProcedure;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getAllProcedures() {
    try {
      const response = await ProcedureService.getAllProcedures();
      this.setProcedures(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getProcedure(id: any) {
    try {
      const response = await ProcedureService.getProcedure(id);
      this.setProcedure(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async storeProcedure(data: IProcedureStoreData) {
    try {
      await ProcedureService.storeProcedure(data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProcedure(id: any, data: IProcedureStoreData) {
    try {
      await ProcedureService.updateProcedure(id, data);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProcedure(id: any) {
    try {
      await ProcedureService.deleteProcedure(id);
    } catch (error) {
      console.log(error);
    }
  }

  setProcedures(procedures: IProcedure[]) {
    this.procedures = procedures;
  }

  setProcedure(procedure: IProcedure) {
    this.procedure = procedure;
  }
}
