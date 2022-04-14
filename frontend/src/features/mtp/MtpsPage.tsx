import Paper from "@mui/material/Paper";
import Mtps from "./Mtps";

// import DepartmentAdd from "./DepartmentAdd";
// import Departments from "./Departments";

const MtpsPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <Mtps />
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

export default MtpsPage;
