import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SectorUpdate = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    step: 0,
    title: '',
    departmentId: 1,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { sectorStore } = useStore();

  useEffect(() => {
    setFormData({
      step: sectorStore.sector?.step,
      title: sectorStore.sector?.title,
      departmentId: 1,
    })
  }, [sectorStore.sector.title, sectorStore.sector.step])

  useEffect(() => {
    setIsDisabled(
      formData.title === sectorStore.sector.title &&
      formData.step === sectorStore.sector.step
    )
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickDelete = async () => {
    await sectorStore.deleteSector(id);
    setFormData({
      step: 0,
      title: '',
      departmentId: 1,
    })
    navigate("/sectors");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title"));
    const step = Number(data.get("step"));
    const departmentId = Number(data.get("departmentId"));

    if (title && step && departmentId) {
      await sectorStore.updateSector(id, title, step, departmentId);
      await sectorStore.getSector(id)
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
        // maxWidth: 500
      }}
    >
      <TextField
        onChange={handleChange}
        value={formData.step}
        name="step"
        label="New sector step"
        variant="standard"
      />

      <TextField
        onChange={handleChange}
        value={formData.title}
        name="title"
        label="New sector title"
        variant="standard"
      />

      <InputLabel id="department-id">Department</InputLabel>
      <Select
        labelId="department-id"
        label="Department"
        name="departmentId"
        defaultValue={1}
      >
        <MenuItem value={1}>PKRV</MenuItem>
      </Select>

      <Button
        type="submit"
        variant="contained"
        disabled={isDisabled}
      >
        Save
      </Button>

      <Button color="error" variant="contained" onClick={handleClickDelete}>
        Delete
      </Button>
    </Box>
  );
};

export default observer(SectorUpdate);
