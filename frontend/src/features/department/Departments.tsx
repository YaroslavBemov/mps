import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'created_at', headerName: 'Created at', width: 150 },
  { field: 'updated_at', headerName: 'Updated at', width: 150 },
];

const Departments = () => {
  const [newDepartment, setNewDepartment] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const { departmentStore } = useStore()

  const navigate = useNavigate()

  useEffect(() => {
    departmentStore.getAllDepartments()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setNewDepartment(value)
    setIsDisabled(value === '')
  }

  const handleClick = () => {
    departmentStore.storeDepartment(newDepartment)
    setNewDepartment('')
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
          label="New department"
          id="fullWidth"
          variant="standard"
          value={newDepartment}
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
              navigate(`/departments/${params.id}`)
            }
          }}
          rows={toJS(departmentStore.departments)}
          columns={columns} />
      </div>
    </>
  );
}

export default observer(Departments)
