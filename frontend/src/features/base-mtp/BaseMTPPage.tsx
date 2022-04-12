import Paper from "@mui/material/Paper";
import BaseProcedureAdd from "../base-procedure/BaseProcedureAdd";
import BaseProcedures from "../base-procedure/BaseProcedures";
import BaseMTP from "./BaseMTP";
import BaseMTPUpdate from "./BaseMTPUpdate";

const BaseMTPPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <BaseMTP />
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <BaseMTPUpdate />
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <BaseProcedureAdd />
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <BaseProcedures />
      </Paper>
    </>
  );
};

export default BaseMTPPage;
