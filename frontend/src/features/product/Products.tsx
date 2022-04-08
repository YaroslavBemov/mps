import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { useNavigate } from 'react-router-dom';

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
  const [newProduct, setNewProduct] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const { productStore } = useStore()

  const navigate = useNavigate()

  useEffect(() => {
    productStore.getAll()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setNewProduct(value)
    setIsDisabled(value === '')
  }

  const handleClick = () => {
    productStore.storeProduct(newProduct)
    setNewProduct('')
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          gap: 1,
          maxWidth: 500
        }}
      >
        <TextField 
        fullWidth 
        label="New product" 
        id="fullWidth" 
        variant="standard" 
        value={newProduct}
        onChange={handleChange}
        />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Button 
          variant="contained" 
          onClick={handleClick}
          disabled={isDisabled}
          >Add</Button>
        </Box>
      </Box>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`${params.id}`)
            }
          }}
          rows={toJS(productStore.products)}
          columns={columns} />
      </div>
    </>
  );
}

export default observer(Product)
