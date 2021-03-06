import Paper from "@mui/material/Paper";

import DepartmentAdd from "./DepartmentAdd";
import Departments from "./Departments";

const DepartmentsPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <DepartmentAdd />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <Departments />
      </Paper>
    </>
  );
};

export default DepartmentsPage;
