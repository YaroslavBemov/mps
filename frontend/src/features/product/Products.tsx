import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
import ProductAdd from "./ProductAdd";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 150 },
  // { field: "created_at", headerName: "Created at", width: 150 },
  // { field: "updated_at", headerName: "Updated at", width: 150 },
];

const Products = () => {
  const { productStore } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    productStore.getAllProducts();
  }, []);

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`${params.id}`);
            }
          }}
          rows={toJS(productStore.products)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(Products);
