import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../../hooks/useStore';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'created_at', headerName: 'Created at', width: 150 },
  { field: 'updated_at', headerName: 'Updated at', width: 150 },
];

const Product = () => {
  const {productStore} = useStore()

  useEffect(() => {
    productStore.getAll()
  }, [])

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={toJS(productStore.products)} columns={columns} />
    </div>
  );
}

export default observer(Product)
