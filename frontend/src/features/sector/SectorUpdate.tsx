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
    title: "",
    departmentId: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { sectorStore, departmentStore } = useStore();

  useEffect(() => {
    const fetchSector = async () => {
      await departmentStore.getAllDepartments();
      await sectorStore.getSector(id);
    };
    fetchSector().then(() => {
      setFormData({
        step: sectorStore.sector?.step,
        title: sectorStore.sector?.title,
        departmentId: String(sectorStore.sector?.department?.id),
      });
    });
  }, [
    sectorStore.sector.step,
    sectorStore.sector.title,
    sectorStore.sector.department?.id,
  ]);

  useEffect(() => {
    setIsDisabled(
      formData.title === sectorStore.sector.title &&
        formData.step === sectorStore.sector.step &&
        formData.departmentId === String(sectorStore.sector.department.id)
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
    await sectorStore.deleteSector(id);
    setFormData({
      step: 0,
      title: "",
      departmentId: "",
    });
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
      await sectorStore.getSector(id);
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
        value={formData.departmentId}
        onChange={handleChange}
      >
        {departmentStore.departments?.map((dep) => (
          <MenuItem key={dep.id} value={dep.id}>
            {dep.title}
          </MenuItem>
        ))}
      </Select>

      <Button type="submit" variant="contained" disabled={isDisabled}>
        Save
      </Button>

      <Button color="error" variant="contained" onClick={handleClickDelete}>
        Delete
      </Button>
    </Box>
  );
};

export default observer(SectorUpdate);
