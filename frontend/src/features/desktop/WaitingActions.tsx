import React from "react";

import { GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import { useStore } from "../../hooks/useStore";
import ProductionService, {
  IChangeProductionData,
} from "../../services/ProductionService";

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

  const handleToWorkClick = async () => {
    data.statusId = 3;
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
    </>
  );
};

export default Actions;
