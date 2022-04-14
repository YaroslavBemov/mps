import { makeAutoObservable, toJS } from "mobx";
import BaseMTPService from "../services/BaseMTPService";
import { IProduct } from './ProductStore'

export interface IBaseMTP {
  id: number;
  title: string;
  product: IProduct;
  created_at: string;
  updated_at: string;
}

export default class BaseMTPStore {
  rootStore;
  baseMTPs: IBaseMTP[] = [];
  baseMTP = {} as IBaseMTP;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getAllBaseMTPs() {
    try {
      const response = await BaseMTPService.getAllBaseMTPs();
      this.setBaseMTPs(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getBaseMTP(id: any) {
    try {
      const response = await BaseMTPService.getBaseMTP(id);
      this.setBaseMTP(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async storeBaseMTP(title: string, productId: number) {
    try {
      await BaseMTPService.storeBaseMTP(title, productId);
    } catch (error) {
      console.log(error);
    }
  }

  async updateBaseMTP(id: any, title: string, productId: number) {
    try {
      await BaseMTPService.updateBaseMTP(id, title, productId);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBaseMTP(id: any) {
    try {
      await BaseMTPService.deleteBaseMTP(id);
    } catch (error) {
      console.log(error);
    }
  }

  setBaseMTPs(baseMTPs: IBaseMTP[]) {
    this.baseMTPs = baseMTPs;
  }

  setBaseMTP(baseMTP: IBaseMTP) {
    this.baseMTP = baseMTP;
  }

  get byProduct() {
    return this.baseMTPs.filter((mtp) => {
      return mtp.product.id === this.rootStore.productStore.product.id;
    });
  }
}
