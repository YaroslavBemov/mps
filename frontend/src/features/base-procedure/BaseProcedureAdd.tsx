import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BaseProcedureAdd = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    position: "",
    title: "",
    sectorId: "",
    timeTotal: "",
    timePerProduct: "",
    comment: "",
  });
  const { baseProcedureStore, sectorStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    sectorStore.getAllSectors();
  }, []);

  useEffect(() => {
    setIsDisabled(
      !formData.title ||
        !formData.position ||
        !formData.sectorId ||
        !formData.timeTotal ||
        !formData.timePerProduct
    );
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
      await baseProcedureStore.storeBaseProcedure({
        position,
        title,
        baseMtpId,
        sectorId,
        timeTotal,
        timePerProduct,
        comment,
      });
      await baseProcedureStore.getAllBaseProcedures();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={
        {
          // display: "flex",
          // flexDirection: 'column',
          // justifyContent: "center",
          // alignItems: "center",
          // padding: 2,
          // gap: 1,
        }
      }
    >
      <Box
        sx={{
          display: "flex",
          // flexDirection: 'column',
          // justifyContent: "center",
          // alignItems: "center",

          // padding: 2,
          // gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
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
      {/* <Box sx={{
        // display: "flex",
        // flexDirection: 'column',
        // justifyContent: "center",
        // alignItems: "center",

        padding: 2,
        gap: 1,
      }}> */}
      <Button type="submit" variant="contained" disabled={isDisabled}>
        Add
      </Button>
      {/* </Box> */}
    </Box>
  );
};

export default observer(BaseProcedureAdd);
