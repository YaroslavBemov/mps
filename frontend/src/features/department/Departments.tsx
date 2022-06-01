import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useStore } from "../../hooks/useStore";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 250 },
];

const Departments = () => {
  const { departmentStore } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    departmentStore.getAllDepartments();
  }, []);

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`/departments/${params.id}`);
            }
          }}
          rows={toJS(departmentStore.departments)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(Departments);
