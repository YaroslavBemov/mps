import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useStore } from "../../hooks/useStore"


const Product = () => {
  const {productStore} = useStore()
  const {id} = useParams()

  useEffect(()=>{
    productStore.getProduct(id)
  }, [])

  return (
    <div>
      {productStore.product?.title}
    </div>
  )
}

export default observer(Product)
