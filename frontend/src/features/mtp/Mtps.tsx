import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

function getOrderTitle(params: GridValueGetterParams) {
  return params.row.order.title;
}

function getProductTitle(params: GridValueGetterParams) {
  return params.row.order.product.title;
}

const columns: GridColDef[] = [
  {
    field: "order_id",
    headerName: "Order",
    width: 250,
    valueGetter: getOrderTitle,
  },
  { field: "serial", headerName: "Serial", width: 250 },
  {
    field: "product",
    headerName: "Product",
    width: 250,
    valueGetter: getProductTitle,
  },
];

const Mtps = () => {
  const { mtpStore, orderStore } = useStore();
  // TODO rework
  const orderId = orderStore.order.id;

  const navigate = useNavigate();

  useEffect(() => {
    mtpStore.getAllMtps();
  }, []);

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`/mtps/${params.id}`);
            }
          }}
          rows={orderId ? toJS(mtpStore.byOrder) : toJS(mtpStore.mtps)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(Mtps);
