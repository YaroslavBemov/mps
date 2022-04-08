import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useStore } from "../../hooks/useStore"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Sector = () => {
  const [updated, setUpdated] = useState('')
  const [isInputDisabled, setIsInputDisabled] = useState(true)
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const {sectorStore} = useStore()
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    sectorStore.getSector(id)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setUpdated(value)
    setIsSaveDisabled(value === sectorStore.sector.title)
  }

  const handleClickUpdate = () => {
    setUpdated(sectorStore.sector.title)
    setIsInputDisabled(false)
  }

  const handleClickSave = async () => {
    // await sectorStore.updateSector(id, updated)
    await sectorStore.getSector(id)
    setUpdated('')
    setIsInputDisabled(true)
    setIsSaveDisabled(true)
  }

  const handleClickDelete = async () => {
    await sectorStore.deleteSector(id)
    setUpdated('')
    navigate('/products')
  }

  return (
    <>
      <div>
        {sectorStore.sector?.title}
      </div>

      <TextField 
        sx={{marginBottom: 2}}
        fullWidth 
        label="Updated sector" 
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
    </>
  )
}

export default observer(Sector)
