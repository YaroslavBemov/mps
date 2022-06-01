import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import StoppedActions from "./StoppedActions";
import WipActions from "./WipActions";
import WaitingActions from "./WaitingActions";
import { useStore } from "../../hooks/useStore";

function getOrderTitle(params: GridValueGetterParams) {
  return params.row.order.title;
}

function getProductTitle(params: GridValueGetterParams) {
  return params.row.order.product.title;
}

const stoppedColumns: GridColDef[] = [
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
    renderCell: StoppedActions,
  },
];

const wipColumns: GridColDef[] = [
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
    renderCell: WipActions,
  },
];

const waitingColumns: GridColDef[] = [
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
    renderCell: WaitingActions,
  },
];

const DesktopMain = () => {
  const { desktopStore, authStore } = useStore();

  useEffect(() => {
    const fetch = async () => {
      await desktopStore.getDesktop();
    };
    fetch();
  }, [authStore.role]);

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
            columns={stoppedColumns}
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
            columns={wipColumns}
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
            columns={waitingColumns}
          />
        </div>
      </Paper>
    </>
  );
};

export default observer(DesktopMain);
