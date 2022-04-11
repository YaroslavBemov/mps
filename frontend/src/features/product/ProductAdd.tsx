import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useStore } from "../../hooks/useStore";

const ProductUpdate = () => {
  const [newProduct, setNewProduct] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { productStore } = useStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewProduct(value);
    setIsDisabled(value === "");
  };

  const handleClick = () => {
    productStore.storeProduct(newProduct);
    setNewProduct("");
    setIsDisabled(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          gap: 1,
          maxWidth: 500,
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={isDisabled}
          >
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default observer(ProductUpdate);
