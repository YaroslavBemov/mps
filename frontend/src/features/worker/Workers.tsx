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
  { field: "title", headerName: "Title", width: 250 },
  {
    field: "sector_id",
    headerName: "Sector ID",
    width: 150,
    valueGetter: getSectorTitle,
  },
];

const Workers = () => {
  const { workerStore } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    workerStore.getAllWorkers();
  }, []);

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`/workers/${params.id}`);
            }
          }}
          rows={toJS(workerStore.workers)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(Workers);
