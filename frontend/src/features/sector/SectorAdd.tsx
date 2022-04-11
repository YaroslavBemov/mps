import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useState } from "react";

const SectorAdd = () => {
  // const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    step: 0,
    title: "",
    departmentId: 1,
  });
  const { sectorStore } = useStore();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // setIsDisabled(formData.step === 0 || formData.title === "");
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title"));
    const step = Number(data.get("step"));
    const departmentId = Number(data.get("departmentId"));

    if (title && step && departmentId) {
      sectorStore.storeSector(title, step, departmentId);
      // setIsDisabled(true);
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
        value={formData.step}
        onChange={handleChange}
        name="step"
        label="New sector step"
        variant="standard"
      />

      <TextField
        value={formData.title}
        onChange={handleChange}
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
      // disabled={isDisabled}
      >
        Add
      </Button>
    </Box>
  );
};

export default observer(SectorAdd);
