import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

function getProductTitle(params: GridValueGetterParams) {
  return params.row.product.title;
}

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 250 },
  {
    field: "product",
    headerName: "Product",
    width: 250,
    valueGetter: getProductTitle,
  },
  { field: "count", headerName: "Count", width: 150 },
];

const Orders = () => {
  const { orderStore } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    orderStore.getAllOrders();
  }, []);

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`/orders/${params.id}`);
            }
          }}
          rows={toJS(orderStore.orders)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(Orders);
