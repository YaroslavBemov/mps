import Paper from "@mui/material/Paper";
import Process from "./Process";
import ProcessUpdate from "./ProcessUpdate";


const ProcessPage = () => {
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
        <Process />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <ProcessUpdate />
      </Paper>
    </>
  );
};

export default ProcessPage;
