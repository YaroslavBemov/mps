import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";

interface IUser {
  id: number;
  name: string;
}

export type Role = "admin" | "tech" | "compl" | "oper" | "otk" | "";

export default class AuthStore {
  user = {} as IUser;
  role: string;
  isAuth: boolean = false;
  rootStore: any;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.role = "admin";
  }

  setAuth(state: boolean) {
    this.isAuth = state;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setRole(role: string) {
    console.log(this.role);
    this.role = role;
    console.log(this.role);
  }

  async login(name: string, password: string) {
    try {
      const response = await AuthService.login(name, password);
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (error) {
      console.log(error);
    }
  }

  async refresh() {
    try {
      const response = await AuthService.refresh();
      // console.log(response);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }
}
