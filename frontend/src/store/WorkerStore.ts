import { makeAutoObservable } from "mobx";
import WorkerService from "../services/WorkerService";
import { ISector } from "./SectorStore";

export interface IWorker {
  id: number;
  title: string;
  sector_id: number;
  sector: ISector;
  created_at: string;
  updated_at: string;
}

export interface IWorkerStoreData {
  title: string;
  sector_id: number;
}

export default class WorkerStore {
  rootStore;
  workers: IWorker[] = [];
  worker = {} as IWorker;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getAllWorkers() {
    try {
      const response = await WorkerService.getAllWorkers();
      this.setWorkers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getWorker(id: any) {
    try {
      const response = await WorkerService.getWorker(id);
      this.setWorker(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async storeWorker(data: IWorkerStoreData) {
    try {
      await WorkerService.storeWorker(data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateWorker(id: any, data: IWorkerStoreData) {
    try {
      await WorkerService.updateWorker(id, data);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteWorker(id: any) {
    try {
      await WorkerService.deleteWorker(id);
    } catch (error) {
      console.log(error);
    }
  }

  setWorkers(workers: IWorker[]) {
    this.workers = workers;
  }

  setWorker(worker: IWorker) {
    this.worker = worker;
  }
}
