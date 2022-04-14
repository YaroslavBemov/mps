import { makeAutoObservable, toJS } from "mobx";
import BaseMTPService from "../services/BaseMTPService";
import MtpService from "../services/MtpService";
import { IOrder } from "./OrderStore";
import { IProduct } from './ProductStore'

export interface IMtp {
  id: number;
  orderId: number;
  order: IOrder;
  serial: number;
  created_at: string;
  updated_at: string;
}

export interface IMtpStoreData {
  orderId: number;
  serial: number;
}

export default class MtpStore {
  rootStore;
  mtps: IMtp[] = [];
  mtp = {} as IMtp;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getAllMtps() {
    try {
      const response = await MtpService.getAllMtps();
      this.setMtps(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getMtp(id: any) {
    try {
      const response = await MtpService.getMtp(id);
      this.setMtp(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async storeMtp(data: IMtpStoreData) {
    try {
      await MtpService.storeMtp(data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateMtp(id: any, data: IMtpStoreData) {
    try {
      await MtpService.updateMtp(id, data);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMtp(id: any) {
    try {
      await MtpService.deleteMtp(id);
    } catch (error) {
      console.log(error);
    }
  }

  setMtps(mtps: IMtp[]) {
    this.mtps = mtps;
  }

  setMtp(mtp: IMtp) {
    this.mtp = mtp;
  }

  // get byProduct() {
  //   return this.baseMTPs.filter((mtp) => {
  //     return mtp.product.id === this.rootStore.productStore.product.id;
  //   });
  // }
}
