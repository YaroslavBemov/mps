import { useState } from "react";
import { observer } from "mobx-react-lite";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useStore } from "../../hooks/useStore";

const DepartmentAdd = () => {
  const [newDepartment, setNewDepartment] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { departmentStore } = useStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewDepartment(value);
    setIsDisabled(value === "");
  };

  const handleClick = async () => {
    await departmentStore.storeDepartment(newDepartment);
    await departmentStore.getAllDepartments();
    setNewDepartment("");
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
          label="New department"
          id="fullWidth"
          variant="standard"
          value={newDepartment}
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

export default observer(DepartmentAdd);
