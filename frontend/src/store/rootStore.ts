import AuthStore from './authStore'
import UIStore from './uiStore'

export default class RootStore {
  authStore: AuthStore
  uiStore: UIStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.uiStore = new UIStore(this)
  }
}
