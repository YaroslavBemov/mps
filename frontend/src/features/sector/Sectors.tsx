import { DataGrid, GridRowsProp, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { useNavigate } from 'react-router-dom';

function getDepartmentTitle(params: GridValueGetterParams) {
  return params.row.department.title ?? ''
}

const columns: GridColDef[] = [
  { field: 'step', headerName: 'Step', width: 250 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'department', headerName: 'Department', width: 250, valueGetter: getDepartmentTitle },
  { field: 'created_at', headerName: 'Created at', width: 150 },
  { field: 'updated_at', headerName: 'Updated at', width: 150 },
];

const Sectors = () => {
  const [newSector, setNewSector] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const { sectorStore } = useStore()

  const navigate = useNavigate()

  useEffect(() => {
    sectorStore.getAllSectors()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setNewSector(value)
    setIsDisabled(value === '')
  }

  const handleClick = () => {
    // sectorStore.storeSector(newSector)
    setNewSector('')
    setIsDisabled(true)
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
          label="New sector"
          id="fullWidth"
          variant="standard"
          value={newSector}
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
          initialState={{
            sorting: {
              sortModel: [{ field: 'step', sort: 'asc' }],
            },
          }}
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              navigate(`${params.id}`)
            }
          }}
          rows={toJS(sectorStore.sectors)}
          columns={columns} />
      </div>
    </>
  );
}

export default observer(Sectors)
