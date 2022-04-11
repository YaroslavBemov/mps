import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
import DepartmentAdd from "./DepartmentAdd";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 250 },
  // { field: "created_at", headerName: "Created at", width: 150 },
  // { field: "updated_at", headerName: "Updated at", width: 150 },
];

const Departments = () => {
  const { departmentStore } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    departmentStore.getAllDepartments();
  }, []);

  return (
    <>
      <DepartmentAdd />
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
