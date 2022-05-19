import $api from "../http";

export default class DesktopService {
  static async getDesktop(worker: string = "admin") {
    return $api.get(`desktops/?worker=${worker}`);
  }
}
