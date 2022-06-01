import Paper from "@mui/material/Paper";
import BaseProcedures from "./BaseProcedures";

const BaseProceduresPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <BaseProcedures />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      ></Paper>
    </>
  );
};

export default BaseProceduresPage;
