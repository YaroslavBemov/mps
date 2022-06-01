import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useStore } from "../../hooks/useStore";

const BaseMTPUpdate = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    productId: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { baseMTPStore } = useStore();

  useEffect(() => {
    const fetchSector = async () => {
      await baseMTPStore.getBaseMTP(id);
    };
    fetchSector().then(() => {
      setFormData({
        title: baseMTPStore.baseMTP?.title,
        productId: String(baseMTPStore.baseMTP?.product?.id),
      });
    });
  }, [baseMTPStore.baseMTP.title]);

  useEffect(() => {
    setIsDisabled(formData.title === baseMTPStore.baseMTP.title);
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickDelete = async () => {
    await baseMTPStore.deleteBaseMTP(id);
    setFormData({
      title: "",
      productId: "",
    });
    navigate(`/products/${formData.productId}`);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title"));
    const productId = Number(formData.productId);

    if (title && productId) {
      await baseMTPStore.updateBaseMTP(id, title, productId);
      await baseMTPStore.getBaseMTP(id);
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
        onChange={handleChange}
        value={formData.title}
        name="title"
        label="New MTP title"
        variant="standard"
      />

      <Button type="submit" variant="contained" disabled={isDisabled}>
        Save
      </Button>

      <Button color="error" variant="contained" onClick={handleClickDelete}>
        Delete
      </Button>
    </Box>
  );
};

export default observer(BaseMTPUpdate);
