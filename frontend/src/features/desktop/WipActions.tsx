import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useStore } from "../../hooks/useStore";
import ProductionService, {
  IChangeProductionData,
} from "../../services/ProductionService";
import Button from "@mui/material/Button";

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
    procedureId: params.row.procedures[0].id,
    statusId: params.row.id,
  };

  const handleStopClick = async () => {
    data.statusId = 4;
    await ProductionService.changeProduction(data);
    await desktopStore.getDesktop();
  };
  const handleDoneClick = async () => {
    data.statusId = 5;
    await ProductionService.changeProduction(data);
    await desktopStore.getDesktop();
  };

  return (
    <>
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

export default Actions;
