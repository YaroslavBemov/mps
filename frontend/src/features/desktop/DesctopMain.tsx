import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 250 },
  // { field: "created_at", headerName: "Created at", width: 150 },
  // { field: "updated_at", headerName: "Updated at", width: 150 },
];

const DesktopMain = () => {
  const { sectorStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      await sectorStore.getAllSectors();
    };
    fetch();
  }, []);

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`/desktop/${params.id}`);
            }
          }}
          rows={toJS(sectorStore.sectors)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(DesktopMain);
