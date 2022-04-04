import AuthStore from './AuthStore'

export default class RootStore {
  authStore: AuthStore

  constructor() {
    this.authStore = new AuthStore(this)
  }
}
