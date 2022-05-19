import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ProductionService, {
  IChangeProductionData,
} from "../../services/ProductionService";

function getOrderTitle(params: GridValueGetterParams) {
  return params.row.order.title;
}

const Actions = (params: GridRenderCellParams) => {
  const { authStore, desktopStore } = useStore();
  const role = authStore.role;
  let workerId = 10;
  switch (role) {
    case "compl":
      workerId = 1;
      break;
    case "oper":
      workerId = 2;
      break;
    case "otk":
      workerId = 3;
      break;

    default:
      break;
  }

  const data: IChangeProductionData = {
    workerId,
    mtpId: params.row.id,
    statusId: params.row.id,
    newStatus: 0,
  };

  const handleToWorkClick = async () => {
    data.newStatus = 3;
    console.log(params.row.procedures[0].id);

    // await ProductionService.changeProduction(data);
    // await desktopStore.getDesktop();
  };
  const handleStopClick = async () => {
    data.newStatus = 4;

    await ProductionService.changeProduction(data);
    await desktopStore.getDesktop();
  };
  const handleDoneClick = async () => {
    data.newStatus = 5;

    await ProductionService.changeProduction(data);
    await desktopStore.getDesktop();
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ ml: 2 }}
        onClick={handleToWorkClick}
      >
        Take to work
      </Button>
      <Button
        variant="outlined"
        color="error"
        sx={{ ml: 2 }}
        onClick={handleStopClick}
      >
        Stop
      </Button>
      <Button
        variant="outlined"
        color="success"
        sx={{ ml: 2 }}
        onClick={handleDoneClick}
      >
        Done
      </Button>
    </>
  );
};

const columns: GridColDef[] = [
  {
    field: "order",
    headerName: "Order",
    width: 250,
    valueGetter: getOrderTitle,
  },
  { field: "serial", headerName: "Serial", width: 250 },
  {
    field: "actions",
    headerName: "Actions",
    width: 350,
    renderCell: Actions,
  },
];

const DesktopMain = () => {
  const { desktopStore } = useStore();
  const navigate = useNavigate();

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
          // p: 2,
          mb: 2,
        }}
      >
        <div>Stopped</div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            onCellClick={(params, event) => {
              if (!event.ctrlKey) {
                event.defaultMuiPrevented = true;
                navigate(`/desktops/${params.id}`);
              }
            }}
            rows={toJS(desktopStore.desktop.stoppedMtps) || []}
            columns={columns}
          />
        </div>
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <div>Work in progress</div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            onCellClick={(params, event) => {
              if (!event.ctrlKey) {
                event.defaultMuiPrevented = true;
                navigate(`/desktops/${params.id}`);
              }
            }}
            rows={toJS(desktopStore.desktop.wipMtps) || []}
            columns={columns}
          />
        </div>
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
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
