import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useParams, useNavigate } from "react-router-dom";

const BaseMTPAdd = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    productId: '',
    count: ''
  });
  const { orderStore, productStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    productStore.getAllProducts()
  }, []);

  useEffect(() => {
    setIsDisabled(formData.title === "" || formData.count === '' || formData.productId === '');
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const title = String(data.get("title"));
    const productId = id ? Number(id) : Number(data.get('productId'));
    const count = Number(data.get("count"));

    if (title && productId && count) {
      const { id: orderId } = await orderStore.storeOrder({ title, productId, count });

      navigate(`/orders/${orderId}`)

      // await orderStore.getAllOrders();
      // setFormData({
      //   title: "",
      //   productId: '',
      //   count: ''
      // });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        gap: 1,
      }}
    >
      <TextField
        value={formData.title}
        onChange={handleChange}
        name="title"
        label="New order title"
        variant="standard"
      />

      <InputLabel id="product-id">Product</InputLabel>
      <Select
        labelId="product-id"
        label="Product"
        name="productId"
        value={formData.productId}
        onChange={handleChange}
      >
        {productStore.products?.map((product) => (
          <MenuItem key={product.id} value={product.id}>
            {product.title}
          </MenuItem>
        ))}
      </Select>

      <TextField
        value={formData.count}
        onChange={handleChange}
        name="count"
        label="New order count"
        variant="standard"
      />

      <Button type="submit" variant="contained" disabled={isDisabled}>
        Add
      </Button>
    </Box>
  );
};

export default observer(BaseMTPAdd);
