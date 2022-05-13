import Paper from "@mui/material/Paper";
import BaseProcedureAdd from "../base-procedure/BaseProcedureAdd";
import BaseProcedures from "../base-procedure/BaseProcedures";
import Mtp from "./Mtp";
import MtpProcedures from "./MtpProcedures";
import MtpUpdate from "./MtpUpdate";

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
        <MtpProcedures />
      </Paper>
    </>
  );
};

export default MtpPage;
