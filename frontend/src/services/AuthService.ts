import $api from "../http";


export default class AuthService {
  static async login(name: string, password: string) {
    return $api.post('login', {name, password})
  }

  static async logout() {
    return $api.post('logout')
  }
}
