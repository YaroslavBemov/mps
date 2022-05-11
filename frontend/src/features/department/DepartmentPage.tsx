import Paper from "@mui/material/Paper";

import Sectors from "../sector/Sectors";
import Department from "./Department";
import DepartmentUpdate from "./DepartmentUpdate";

const DepartmentPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <Department />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <DepartmentUpdate />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        {/* <Sectors /> */}
      </Paper>
    </>
  );
};

export default DepartmentPage;
