import AuthStore from './authStore'
import ProductStore from './productStore'
import UIStore from './uiStore'

export default class RootStore {
  authStore: AuthStore
  uiStore: UIStore
  productStore: ProductStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.uiStore = new UIStore(this)
    this.productStore = new ProductStore(this)
  }
}
