import Paper from "@mui/material/Paper";
import Procedures from "../procedure/Procedures";
import Mtp from "./Mtp";

const MtpPage = () => {
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
        <Mtp />
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
        <Procedures />
      </Paper>
    </>
  );
};

export default MtpPage;
