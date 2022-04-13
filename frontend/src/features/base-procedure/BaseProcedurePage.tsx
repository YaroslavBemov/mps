import Paper from "@mui/material/Paper";
import BaseProcedure from "./BaseProcedure";
import BaseProcedureUpdate from "./BaseProcedureUpdate";


const BaseProcedurePage = () => {
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
        <BaseProcedure />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <BaseProcedureUpdate />
      </Paper>
    </>
  );
};

export default BaseProcedurePage;
