import { DataGrid, GridRowsProp, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
  // const [newSector, setNewSector] = useState('')
  // const [isDisabled, setIsDisabled] = useState(true)
  // const [age, setAge] = React.useState('');
  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };
  const { sectorStore } = useStore()

  const navigate = useNavigate()

  useEffect(() => {
    sectorStore.getAllSectors()
  }, [])

  // const handleClick = () => {
  // sectorStore.storeSector(newSector)
  // setNewSector('')
  // setIsDisabled(true)
  // }

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target
  //   setNewSector(value)
  //   setIsDisabled(value === '')
  // }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = String(data.get('title'))
    const step = Number(data.get('step'))
    const departmentId = Number(data.get('departmentId'))

    if (title && step && departmentId) {
      sectorStore.storeSector(title, step, departmentId)
    }
  }

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          gap: 1,
          // maxWidth: 500
        }}
      >
        <TextField
          // fullWidth
          name="title"
          label="New sector title"
          variant="standard"
        />

        <TextField
          // fullWidth
          name="step"
          label="New sector step"
          variant="standard"
        />

        {/* <TextField
          fullWidth
          name="departmentId"
          label="New sector department"
          variant="standard"
        /> */}

        <InputLabel id='department-id'>Department</InputLabel>
        <Select
          labelId="department-id"
          // id="demo-simple-select-standard"
          // value={age}
          // onChange={handleChange}
          label="Department"
          name='departmentId'
          defaultValue={1}
        >
          <MenuItem value={1}>PKRV</MenuItem>
        </Select>

        {/* <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}> */}
        <Button
          type='submit'
          variant="contained"
        // disabled={isDisabled}
        >Add</Button>
        {/* </Box> */}
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
              navigate(`/sectors/${params.id}`)
            }
          }}
          rows={toJS(sectorStore.sectors)}
          columns={columns} />
      </div>
    </>
  );
}

export default observer(Sectors)
