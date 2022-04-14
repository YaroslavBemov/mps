import Paper from "@mui/material/Paper";
import Workers from "./Workers";


const WorkersPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <Workers />
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

export default WorkersPage;
