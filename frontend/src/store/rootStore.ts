import AuthStore from "./authStore";
import BaseMTPStore from "./baseMTPStore";
import BaseProcedureStore from "./baseProcedureStore";
import DepartmentStore from "./departmentStore";
import ProductStore from "./productStore";
import SectorStore from "./sectorStore";
import UIStore from "./uiStore";

export default class RootStore {
  authStore: AuthStore;
  uiStore: UIStore;
  productStore: ProductStore;
  departmentStore: DepartmentStore;
  sectorStore: SectorStore;
  baseMTPStore: BaseMTPStore;
  baseProcedureStore: BaseProcedureStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.uiStore = new UIStore(this);
    this.productStore = new ProductStore(this);
    this.departmentStore = new DepartmentStore(this);
    this.sectorStore = new SectorStore(this);
    this.baseMTPStore = new BaseMTPStore(this);
    this.baseProcedureStore = new BaseProcedureStore(this);
  }
}
