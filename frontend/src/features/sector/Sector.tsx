import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const Sector = () => {
  const [updated, setUpdated] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { sectorStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    sectorStore.getSector(id);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdated(value);
    setIsSaveDisabled(value === sectorStore.sector.title);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title"));
    const step = Number(data.get("step"));
    const departmentId = Number(data.get("departmentId"));

    if (title && step && departmentId) {
      sectorStore.storeSector(title, step, departmentId);
    }
  };
  //TODO WIP
  const handleClickUpdate = (event: any) => {
    console.log(event.currentTarget);

    // const data = new FormData(event.currentTarget)
    // data.set('title', sectorStore.sector.title)
    // data.set('step', String(sectorStore.sector.step))

    // data.set('departmentId', String(sectorStore.sector.departmentId))
  };

  const handleClickSave = async () => {
    // await sectorStore.updateSector(id, updated)
    await sectorStore.getSector(id);
    setUpdated("");
    setIsInputDisabled(true);
    setIsSaveDisabled(true);
  };

  const handleClickDelete = async () => {
    await sectorStore.deleteSector(id);
    setUpdated("");
    navigate("/sectors");
  };

  return (
    <>
      <div>{sectorStore.sector?.title}</div>

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
          // fullWidth
          name="title"
          label="New sector title"
          variant="standard"
        />

        <TextField
          // fullWidth
          name="step"
          label="New sector step"
          variant="standard"
        />

        <InputLabel id="department-id">Department</InputLabel>
        <Select
          labelId="department-id"
          // id="demo-simple-select-standard"
          // value={age}
          // onChange={handleChange}
          label="Department"
          name="departmentId"
          defaultValue={1}
        >
          <MenuItem value={1}>PKRV</MenuItem>
        </Select>

        <Button variant="contained" onClick={handleClickUpdate}>
          Edit
        </Button>

        <Button
          type="submit"
          color="success"
          variant="contained"
          disabled={isSaveDisabled}
        >
          Save
        </Button>
      </Box>

      <Button color="error" variant="contained" onClick={handleClickDelete}>
        Delete
      </Button>
    </>
  );
};

export default observer(Sector);
