import $api from "../http";

export default class DesktopService {
  static async getAllDesktops() {
    return $api.get("desktops");
  }
}
