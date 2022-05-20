import AuthStore from "./AuthStore";
import BaseMTPStore from "./BaseMTPStore";
import BaseProcedureStore from "./BaseProcedureStore";
import DepartmentStore from "./DepartmentStore";
import ProductStore from "./ProductStore";
import SectorStore from "./SectorStore";
import UIStore from "./UiStore";
import OrderStore from "./OrderStore";
import MtpStore from "./MtpStore";
import ProcedureStore from "./ProcedureStore";
import WorkerStore from "./WorkerStore";
import ProcessStore from "./ProcessStore";
import DesktopStore from "./DesktopStore";
import ProductionStore from "./ProductionStore";

export default class RootStore {
  authStore: AuthStore;
  uiStore: UIStore;
  productStore: ProductStore;
  departmentStore: DepartmentStore;
  sectorStore: SectorStore;
  baseMTPStore: BaseMTPStore;
  baseProcedureStore: BaseProcedureStore;
  orderStore: OrderStore;
  mtpStore: MtpStore;
  procedureStore: ProcedureStore;
  workerStore: WorkerStore;
  processStore: ProcessStore;
  desktopStore: DesktopStore;
  productionStore: ProductionStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.uiStore = new UIStore(this);
    this.productStore = new ProductStore(this);
    this.departmentStore = new DepartmentStore(this);
    this.sectorStore = new SectorStore(this);
    this.baseMTPStore = new BaseMTPStore(this);
    this.baseProcedureStore = new BaseProcedureStore(this);
    this.orderStore = new OrderStore(this);
    this.mtpStore = new MtpStore(this);
    this.procedureStore = new ProcedureStore(this);
    this.workerStore = new WorkerStore(this);
    this.processStore = new ProcessStore(this);
    this.desktopStore = new DesktopStore(this);
    this.productionStore = new ProductionStore(this);
  }
}
