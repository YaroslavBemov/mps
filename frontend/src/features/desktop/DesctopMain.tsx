import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { toJS } from "mobx";
import Paper from "@mui/material/Paper";
import Actions from "./Actions";

function getOrderTitle(params: GridValueGetterParams) {
  return params.row.order.title;
}

function getProductTitle(params: GridValueGetterParams) {
  return params.row.order.product.title;
}

const columns: GridColDef[] = [
  {
    field: "order",
    headerName: "Order",
    width: 150,
    valueGetter: getOrderTitle,
  },
  {
    field: "product",
    headerName: "Product",
    width: 250,
    valueGetter: getProductTitle,
  },
  { field: "serial", headerName: "Serial", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    width: 350,
    renderCell: Actions,
  },
];

const DesktopMain = () => {
  const { desktopStore } = useStore();

  useEffect(() => {
    const fetch = async () => {
      await desktopStore.getDesktop();
    };
    fetch();
  }, []);

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <div>Stopped</div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={toJS(desktopStore.desktop.stoppedMtps) || []}
            columns={columns}
          />
        </div>
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <div>Work in progress</div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={toJS(desktopStore.desktop.wipMtps) || []}
            columns={columns}
          />
        </div>
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <div>Waiting</div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={toJS(desktopStore.desktop.waitingMtps) || []}
            columns={columns}
          />
        </div>
      </Paper>
    </>
  );
};

export default observer(DesktopMain);
