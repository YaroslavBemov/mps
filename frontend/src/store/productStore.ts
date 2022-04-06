import { makeAutoObservable } from "mobx"

export default class ProductStore{
  rootStore
  products = []

  constructor(rootStore: any) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }
}
