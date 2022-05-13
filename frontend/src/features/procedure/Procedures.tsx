import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

function getSectorTitle(params: GridValueGetterParams) {
  return params.row.sector.title ?? "";
}

function getStatusTitle(params: GridValueGetterParams) {
  return params.row.status.title ?? "";
}

const columns: GridColDef[] = [
  { field: "mtp_id", headerName: "MTP ID", width: 100 },
  { field: "position", headerName: "Position", width: 100 },
  { field: "title", headerName: "Title", width: 250 },
  {
    field: "sector",
    headerName: "Sector",
    width: 150,
    valueGetter: getSectorTitle,
  },
  { field: "status", headerName: "Status", width: 100, valueGetter: getStatusTitle },
  { field: "comment", headerName: "Comment", width: 150 },
];

const Procedures = () => {
  const { procedureStore, mtpStore } = useStore();
  const { procedures } = mtpStore.mtp

  const navigate = useNavigate();

  useEffect(() => {
    procedureStore.getAllProcedures();
  }, []);

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          initialState={{
            sorting: {
              sortModel: [{ field: "position", sort: "asc" }],
            },
          }}
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`/procedures/${params.id}`);
            }
          }}
          rows={procedures ? toJS(procedures) : toJS(procedureStore.procedures)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(Procedures);
