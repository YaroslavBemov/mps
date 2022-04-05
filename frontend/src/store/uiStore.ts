import { makeAutoObservable } from "mobx"

type Mode = 'light' | 'dark'

export default class UIStore {
  rootStore: any
  mode: Mode = 'light'

  constructor(rootStore: any) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  toggleMode() {
    this.mode === 'light' ? this.setMode('dark') : this.setMode('light')
  }

  setMode(state: Mode) {
    this.mode = state
  }
}
