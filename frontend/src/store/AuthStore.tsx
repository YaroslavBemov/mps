import { makeAutoObservable } from "mobx"

interface IUser {
  id: number
  name: string
}

export default class AuthStore {
  user = {} as IUser
  isAuth: boolean = false
  rootStore: any

  constructor(rootStore: any) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setAuth(state: boolean) {
    this.isAuth = state
  }
}
