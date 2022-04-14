import Paper from "@mui/material/Paper";
import Procedures from "./Procedures";


const ProceduresPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <Procedures />
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

export default ProceduresPage;
