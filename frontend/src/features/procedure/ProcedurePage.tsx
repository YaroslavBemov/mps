import Paper from "@mui/material/Paper";
import Procedure from "./Procedure";
import ProcedureUpdate from "./ProcedureUpdate";


const ProcedurePage = () => {
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
        <Procedure />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <ProcedureUpdate />
      </Paper>
    </>
  );
};

export default ProcedurePage;
