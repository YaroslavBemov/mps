import Paper from "@mui/material/Paper";
import BaseMTP from "./BaseMTP";
import BaseMTPUpdate from "./BaseMTPUpdate";

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
        <BaseMTP />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
        }}
      >
        <BaseMTPUpdate />
      </Paper>
    </>
  );
};

export default DepartmentPage;
