import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useStore } from "../../hooks/useStore"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Product = () => {
  const [updated, setUpdated] = useState('')
  const [isInputDisabled, setIsInputDisabled] = useState(true)
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const {productStore} = useStore()
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    productStore.getProduct(id)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setUpdated(value)
    setIsSaveDisabled(value === productStore.product.title)
  }

  const handleClickUpdate = () => {
    setUpdated(productStore.product.title)
    setIsInputDisabled(false)
  }

  const handleClickSave = async () => {
    await productStore.updateProduct(id, updated)
    await productStore.getProduct(id)
    setUpdated('')
    setIsInputDisabled(true)
  }

  const handleClickDelete = async () => {
    await productStore.deleteProduct(id)
    setUpdated('')
    navigate('/products')
  }

  return (
    <>
      <div>
        {productStore.product?.title}
      </div>

      <TextField 
        fullWidth 
        label="Updated product" 
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

export default observer(Product)
