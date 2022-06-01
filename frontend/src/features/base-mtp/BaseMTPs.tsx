import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { useStore } from "../../hooks/useStore";

function getProductTitle(params: GridValueGetterParams) {
  return params.row.product.title;
}

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 250 },
  {
    field: "product",
    headerName: "Product",
    width: 250,
    valueGetter: getProductTitle,
  },
];

const BaseMTPs = () => {
  const { baseMTPStore } = useStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    baseMTPStore.getAllBaseMTPs();
  }, []);

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`/base-mtps/${params.id}`);
            }
          }}
          rows={toJS(id ? baseMTPStore.byProduct : baseMTPStore.baseMTPs)}
          columns={columns}
        />
      </div>
    </>
  );
};

export default observer(BaseMTPs);
