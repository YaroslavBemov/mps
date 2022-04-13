import { makeAutoObservable, toJS } from "mobx";
import OrderService, { IOrderStoreData } from "../services/OrderService";
import { IProduct } from './productStore'

export interface IOrder {
  id: number;
  title: string;
  product: IProduct;
  count: number;
  created_at: string;
  updated_at: string;
}

export default class OrderStore {
  rootStore;
  orders: IOrder[] = [];
  order = {} as IOrder;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getAllOrders() {
    try {
      const response = await OrderService.getAllOrders();
      this.setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getOrder(id: any) {
    try {
      const response = await OrderService.getOrder(id);
      this.setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async storeOrder(data: IOrderStoreData) {
    try {
      const response = await OrderService.storeOrder(data);
      return response.data
    } catch (error) {
      console.log(error);
    }
  }

  async updateOrder(id: any, data: IOrderStoreData) {
    try {
      await OrderService.updateOrder(id, data);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOrder(id: any) {
    try {
      await OrderService.deleteOrder(id);
    } catch (error) {
      console.log(error);
    }
  }

  setOrders(orders: IOrder[]) {
    this.orders = orders;
  }

  setOrder(order: IOrder) {
    this.order = order;
  }
}
