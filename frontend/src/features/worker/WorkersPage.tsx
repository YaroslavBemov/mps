import Paper from "@mui/material/Paper";
import Workers from "./Workers";

const WorkersPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <Workers />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
      </Paper>
    </>
  );
};

export default WorkersPage;
