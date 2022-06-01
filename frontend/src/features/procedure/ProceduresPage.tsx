import Paper from "@mui/material/Paper";
import Procedures from "./Procedures";


const ProceduresPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <Procedures />
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

export default ProceduresPage;
