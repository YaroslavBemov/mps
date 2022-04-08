import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useStore } from "../../hooks/useStore"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Sectors from "../sector/Sectors";

const Department = () => {
  const [updated, setUpdated] = useState('')
  const [isInputDisabled, setIsInputDisabled] = useState(true)
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const { departmentStore } = useStore()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    departmentStore.getDepartment(id)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setUpdated(value)
    setIsSaveDisabled(value === departmentStore.department.title)
  }

  const handleClickUpdate = () => {
    setUpdated(departmentStore.department.title)
    setIsInputDisabled(false)
  }

  const handleClickSave = async () => {
    await departmentStore.updateDepartment(id, updated)
    await departmentStore.getDepartment(id)
    setUpdated('')
    setIsInputDisabled(true)
    setIsSaveDisabled(true)
  }

  const handleClickDelete = async () => {
    await departmentStore.deleteDepartment(id)
    setUpdated('')
    navigate('/')
  }

  return (
    <>
      <div>
        {departmentStore.department?.title}
      </div>

      <TextField
        sx={{ marginBottom: 2 }}
        fullWidth
        label="Updated department"
        id="fullWidth"
        variant="standard"
        disabled={isInputDisabled}
        value={updated}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        onClick={handleClickUpdate}
      >Edit</Button>

      <Button
        color="success"
        variant="contained"
        disabled={isSaveDisabled}
        onClick={handleClickSave}
      >Save</Button>

      <Button
        color="error"
        variant="contained"
        onClick={handleClickDelete}
      >Delete</Button>

      <hr />

      <Sectors />

    </>
  )
}

export default observer(Department)
