import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useStore } from "../../hooks/useStore";

const BaseProcedureUpdate = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    position: "",
    title: "",
    sectorId: "",
    timeTotal: "",
    timePerProduct: "",
    comment: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { sectorStore, baseProcedureStore } = useStore();

  useEffect(() => {
    const fetchBaseProcedure = async () => {
      await sectorStore.getAllSectors();
      await baseProcedureStore.getBaseProcedure(id);
    };
    fetchBaseProcedure().then(() => {
      setFormData({
        position: String(baseProcedureStore.baseProcedure?.position),
        title: baseProcedureStore.baseProcedure?.title,
        sectorId: String(baseProcedureStore.baseProcedure?.sector?.id),
        timeTotal: baseProcedureStore.baseProcedure?.time_total,
        timePerProduct: baseProcedureStore.baseProcedure?.time_per_product,
        comment: String(baseProcedureStore.baseProcedure?.comment ?? ""),
      });
    });
  }, [
    baseProcedureStore.baseProcedure?.position,
    baseProcedureStore.baseProcedure?.title,
    baseProcedureStore.baseProcedure?.sector?.id,
    baseProcedureStore.baseProcedure?.time_total,
    baseProcedureStore.baseProcedure?.time_per_product,
    baseProcedureStore.baseProcedure?.comment,
  ]);

  useEffect(() => {
    setIsDisabled(
      formData.position === String(baseProcedureStore.baseProcedure.position) &&
        formData.title === baseProcedureStore.baseProcedure.title &&
        formData.sectorId ===
          String(baseProcedureStore.baseProcedure.sector.id) &&
        formData.timeTotal === baseProcedureStore.baseProcedure.time_total &&
        formData.timePerProduct ===
          baseProcedureStore.baseProcedure.time_per_product &&
        (formData.comment === baseProcedureStore.baseProcedure.comment ||
          !formData.comment)
    );
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickDelete = async () => {
    await baseProcedureStore.deleteBaseProcedure(id);
    setFormData({
      position: "",
      title: "",
      sectorId: "",
      timeTotal: "",
      timePerProduct: "",
      comment: "",
    });
    navigate("/products");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const position = Number(data.get("position"));
    const title = String(data.get("title"));
    const timeTotal = String(data.get("timeTotal"));
    const timePerProduct = String(data.get("timePerProduct"));
    const baseMtpId = Number(id);
    const sectorId = Number(data.get("sectorId"));
    const comment = String(data.get("comment"));

    if (
      position &&
      title &&
      timeTotal &&
      timePerProduct &&
      baseMtpId &&
      sectorId
    ) {
      await baseProcedureStore.updateBaseProcedure(id, {
        position,
        title,
        baseMtpId,
        sectorId,
        timeTotal,
        timePerProduct,
        comment,
      });
      await baseProcedureStore.getBaseProcedure(id);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            padding: 2,
            gap: 1,
          }}
        >
          <TextField
            value={formData.position}
            onChange={handleChange}
            name="position"
            label="New procedure position"
            variant="standard"
          />

          <TextField
            value={formData.title}
            onChange={handleChange}
            name="title"
            label="New procedure title"
            variant="standard"
          />

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sector-id">Sector</InputLabel>
            <Select
              labelId="sector-id"
              label="Sector"
              name="sectorId"
              value={formData.sectorId}
              onChange={handleChange}
            >
              {sectorStore.sectors?.map((sector) => (
                <MenuItem key={sector.id} value={sector.id}>
                  {sector.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            padding: 2,
            gap: 1,
          }}
        >
          <TextField
            value={formData.timeTotal}
            onChange={handleChange}
            name="timeTotal"
            label="New procedure time total"
            variant="standard"
          />

          <TextField
            value={formData.timePerProduct}
            onChange={handleChange}
            name="timePerProduct"
            label="New procedure time per product"
            variant="standard"
          />

          <TextField
            value={formData.comment}
            onChange={handleChange}
            name="comment"
            label="New procedure comment"
            variant="standard"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          gap: 1,
        }}
      >
        <Button type="submit" variant="contained" disabled={isDisabled}>
          Save
        </Button>
        <Button color="error" variant="contained" onClick={handleClickDelete}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default observer(BaseProcedureUpdate);
