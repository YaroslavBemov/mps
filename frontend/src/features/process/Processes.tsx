import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

function getSectorTitle(params: GridValueGetterParams) {
  return params.row.sector.title ?? "";
}

const columns: GridColDef[] = [
  { field: "procedure_id", headerName: "PROCEDURE ID", width: 100 },
  { field: "worker_id", headerName: "WORKER ID", width: 100 },
  { field: "time_begin", headerName: "Begin", width: 250 },
  {
    field: "time_finish",
    headerName: "Finish",
    width: 150,
    // valueGetter: getSectorTitle,
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
