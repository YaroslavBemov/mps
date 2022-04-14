import Paper from "@mui/material/Paper";
import Worker from "./Worker";
import WorkerUpdate from "./WorkerUpdate";


const WorkerPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
          display: "flex",
          flexDirection: 'column',
          alignItems: "flex-start",
        }}
      >
        <Worker />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <WorkerUpdate />
      </Paper>
    </>
  );
};

export default WorkerPage;
