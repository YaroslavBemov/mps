import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

function getWorkerTitle(params: GridValueGetterParams) {
  return params.row.worker.title ?? "";
}

function getProcedureTitle(params: GridValueGetterParams) {
  return params.row.procedure.title ?? "";
}

function getStatusTitle(params: GridValueGetterParams) {
  return params.row.status.title ?? "";
}

const columns: GridColDef[] = [
  {
    field: "worker",
    headerName: "Worker",
    width: 150,
    valueGetter: getWorkerTitle,
  },
  {
    field: "procedure",
    headerName: "Procedure",
    width: 150,
    valueGetter: getProcedureTitle,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    valueGetter: getStatusTitle,
  },
  { field: "comment", headerName: "Comment", width: 150 },
];

const Processes = () => {
  const { processStore } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    processStore.getAllProcesses();
  }, []);

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`/processes/${params.id}`);
            }
          }}
          rows={toJS(processStore.processes)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(Processes);
