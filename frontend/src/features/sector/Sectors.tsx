import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { useStore } from "../../hooks/useStore";

function getDepartmentTitle(params: GridValueGetterParams) {
  return params.row.department.title ?? "";
}

const columns: GridColDef[] = [
  { field: "step", headerName: "Step", width: 250 },
  { field: "title", headerName: "Title", width: 250 },
  {
    field: "department",
    headerName: "Department",
    width: 250,
    valueGetter: getDepartmentTitle,
  },
];

const Sectors = () => {
  const { sectorStore } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    sectorStore.getAllSectors();
  }, []);

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          initialState={{
            sorting: {
              sortModel: [{ field: "step", sort: "asc" }],
            },
          }}
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`/sectors/${params.id}`);
            }
          }}
          rows={toJS(sectorStore.sectors)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(Sectors);
