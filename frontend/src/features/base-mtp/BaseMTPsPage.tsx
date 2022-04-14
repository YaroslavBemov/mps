import Paper from "@mui/material/Paper";
import BaseMTPs from "./BaseMTPs";

// import DepartmentAdd from "./DepartmentAdd";
// import Departments from "./Departments";

const BaseMTPsPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <BaseMTPs />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        {/* <Departments /> */}
      </Paper>
    </>
  );
};

export default BaseMTPsPage;
