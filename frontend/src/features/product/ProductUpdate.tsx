import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate, useParams } from "react-router-dom";

const ProductUpdate = () => {
  const [updated, setUpdated] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { productStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      await productStore.getProduct(id);
    };
    fetchProduct().then(() => {
      setUpdated(productStore.product.title)
    })
  }, [productStore.product.title]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdated(value);
    setIsSaveDisabled(value === productStore.product.title);
  };

  const handleClickSave = async () => {
    await productStore.updateProduct(id, updated);
    await productStore.getProduct(id);
    setUpdated("");
    setIsSaveDisabled(true);
  };

  const handleClickDelete = async () => {
    await productStore.deleteProduct(id);
    setUpdated("");
    navigate("/products");
  };
  return (
    <>
      <TextField
        sx={{ marginBottom: 2 }}
        fullWidth
        label="Updated product"
        id="fullWidth"
        variant="standard"
        // disabled={isInputDisabled}
        value={updated}
        onChange={handleChange}
      />

      <Button
        color="success"
        variant="contained"
        disabled={isSaveDisabled}
        onClick={handleClickSave}
      >
        Save
      </Button>

      <Button color="error" variant="contained" onClick={handleClickDelete}>
        Delete
      </Button>
    </>
  );
};

export default observer(ProductUpdate);
