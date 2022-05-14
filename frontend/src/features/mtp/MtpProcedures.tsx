import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate, useParams } from "react-router-dom";
import { IProcedure } from "../../store/ProcedureStore";

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
  {
    field: "status",
    headerName: "Status",
    width: 100,
    valueGetter: getStatusTitle,
  },
  { field: "comment", headerName: "Comment", width: 150 },
];

const Procedures = () => {
  // const [rows, setRows] = useState<IProcedure[]>([])
  const { mtpStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchMtp = async () => {
  //     await mtpStore.getMtp(id);
  //   }
  //   fetchMtp()
  //     .then(() => {
  //       setRows(mtpStore.mtp.procedures)
  //     })
  // }, [id]);

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
          rows={toJS(mtpStore.mtp?.procedures)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(Procedures);
