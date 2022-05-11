import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentUpdate = () => {
  const [updated, setUpdated] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { departmentStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    departmentStore.department.title && setUpdated(departmentStore.department.title);
  }, [departmentStore.department.title]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdated(value);
    setIsSaveDisabled(value === departmentStore.department.title);
  };

  const handleClickSave = async () => {
    await departmentStore.updateDepartment(id, updated);
    await departmentStore.getDepartment(id);
    setUpdated("");
    setIsSaveDisabled(true);
  };

  const handleClickDelete = async () => {
    await departmentStore.deleteDepartment(id);
    setUpdated("");
    navigate("/departments");
  };
  return (
    <>
      <TextField
        sx={{ marginBottom: 2 }}
        fullWidth
        label="Updated department"
        id="fullWidth"
        variant="standard"
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

export default observer(DepartmentUpdate);
