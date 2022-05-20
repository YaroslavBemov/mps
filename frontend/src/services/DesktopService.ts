import $api from "../http";

export default class DesktopService {
  static async getDesktop(workerId: string) {
    return $api.get(`desktops/?workerId=${workerId}`);
  }
}
