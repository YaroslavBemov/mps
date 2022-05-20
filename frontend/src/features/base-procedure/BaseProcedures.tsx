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
  { field: "position", headerName: "Position", width: 100 },
  { field: "title", headerName: "Title", width: 250 },
  {
    field: "sector",
    headerName: "Sector",
    width: 150,
    valueGetter: getSectorTitle,
  },
  { field: "time_total", headerName: "Time total", width: 100 },
  { field: "time_per_product", headerName: "Time per product", width: 150 },
  { field: "comment", headerName: "Comment", width: 150 },
];

const BaseProcedures = () => {
  const { baseProcedureStore, baseMTPStore } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    baseProcedureStore.getAllBaseProcedures();
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
              navigate(`/base-procedures/${params.id}`);
            }
          }}
          rows={
            baseMTPStore.baseMTP.id
              ? toJS(baseProcedureStore.byBaseMTP)
              : toJS(baseProcedureStore.baseProcedures)
          }
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(BaseProcedures);
