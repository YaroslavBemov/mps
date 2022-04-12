import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useParams } from "react-router-dom";

const BaseMTPAdd = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    productId: 1,
  });
  const { baseMTPStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    // departmentStore.getAllDepartments();
  }, []);

  useEffect(() => {
    setIsDisabled(formData.title === "");
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
    const productId = Number(id);

    if (title && productId) {
      await baseMTPStore.storeBaseMTP(title, productId);
      await baseMTPStore.getAllBaseMTPs();
      setFormData({
        title: "",
        productId: 1,
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        gap: 1,
      }}
    >
      <TextField
        value={formData.title}
        onChange={handleChange}
        name="title"
        label="New base MTP title"
        variant="standard"
      />

      <Button type="submit" variant="contained" disabled={isDisabled}>
        Add
      </Button>
    </Box>
  );
};

export default observer(BaseMTPAdd);
