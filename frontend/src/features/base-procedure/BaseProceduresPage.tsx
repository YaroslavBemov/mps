import Paper from "@mui/material/Paper";
import BaseProcedures from "./BaseProcedures";


const BaseProceduresPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <BaseProcedures />
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

export default BaseProceduresPage;
