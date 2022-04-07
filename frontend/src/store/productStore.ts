import { makeAutoObservable } from "mobx"
import ProductService from "../services/ProductService"

interface IProduct {
  id: number,
  title: string,
  created_at: string,
  updated_at: string
}

export default class ProductStore{
  rootStore
  products = []
  product = {} as IProduct

  constructor(rootStore: any) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

 async getAll () {
   try {
     const response = await ProductService.getAll()
    //  console.log(response);
     this.setProducts(response.data)
   } catch (error) {
     console.log(error);
     
   }
 }

 async getProduct (id: any) {
   try {
     const response = await ProductService.getProduct(id)
     console.log(response);
     this.setProduct(response.data)
   } catch (error) {
     console.log(error);
     
   }
 }

 setProducts(products: any) {
  this.products = products
 }

 setProduct(product: any) {
  this.product = product
 }
}
