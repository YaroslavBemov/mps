import { makeAutoObservable } from "mobx"
import ProductService from "../services/ProductService"

export default class ProductStore{
  rootStore
  products = []

  constructor(rootStore: any) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

 async getAll () {
   try {
     const response = await ProductService.getAll()
     console.log(response);
     this.setProducts(response.data)
   } catch (error) {
     
   }
 }

 setProducts(products: any) {
  this.products = products
 }
}
