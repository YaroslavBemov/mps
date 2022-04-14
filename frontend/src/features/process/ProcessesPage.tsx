import Paper from "@mui/material/Paper";
import Processes from "./Processes";


const ProcessesPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <Processes />
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

export default ProcessesPage;
