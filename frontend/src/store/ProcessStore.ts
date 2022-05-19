import { makeAutoObservable, toJS } from "mobx";
import ProcessService from "../services/ProcessService";
import { IBaseMTP } from "./BaseMTPStore";
import { IProcedure, IStatus } from "./ProcedureStore";
import { ISector } from "./SectorStore";
import { IWorker } from "./WorkerStore";

interface IProcess {
  id: number;
  worker_id: number;
  worker: IWorker;
  procedure_id: number;
  procedure: IProcedure;
  status_id: number;
  status: IStatus;
  comment?: string;
  created_at: string;
  updated_at: string;
}

export interface IProcessStoreData {
  procedure_id: number;
  worker_id: number;
  status_id: number;
  comment?: string;
}

export default class ProcessStore {
  rootStore;
  processes: IProcess[] = [];
  process = {} as IProcess;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getAllProcesses() {
    try {
      const response = await ProcessService.getAllProcesses();
      this.setProcesses(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getProcess(id: any) {
    try {
      const response = await ProcessService.getProcess(id);
      this.setProcess(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async storeProcess(data: IProcessStoreData) {
    try {
      await ProcessService.storeProcess(data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProcess(id: any, data: IProcessStoreData) {
    try {
      await ProcessService.updateProcess(id, data);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProcess(id: any) {
    try {
      await ProcessService.deleteProcess(id);
    } catch (error) {
      console.log(error);
    }
  }

  setProcesses(processes: IProcess[]) {
    this.processes = processes;
  }

  setProcess(process: IProcess) {
    this.process = process;
  }

  // get byMTP() {
  //   return this.process.filter((bp) => {
  //     return bp.Mtp.id === this.rootStore.MTPStore.MTP.id;
  //   });
  // }
}
