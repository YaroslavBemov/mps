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
  products: IProduct[] = []
  product = {} as IProduct

  constructor(rootStore: any) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

 async getAllProducts () {
   try {
     const response = await ProductService.getAll()
     this.setProducts(response.data)
   } catch (error) {
     console.log(error);
     
   }
 }

 async getProduct (id: any) {
   try {
     const response = await ProductService.getProduct(id)
     this.setProduct(response.data)
   } catch (error) {
     console.log(error);
     
   }
 }

 async storeProduct (title: string) {
  try {
    await ProductService.storeProduct(title)
    await this.getAllProducts()
  } catch (error) {
    console.log(error);
    
  }
}

 async updateProduct (id: any, title: string) {
  try {
    await ProductService.updateProduct(id, title)
  } catch (error) {
    console.log(error);
    
  }
}

 async deleteProduct (id: any) {
  try {
    await ProductService.deleteProduct(id)
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
