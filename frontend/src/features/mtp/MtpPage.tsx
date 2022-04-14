import Paper from "@mui/material/Paper";
import BaseProcedureAdd from "../base-procedure/BaseProcedureAdd";
import BaseProcedures from "../base-procedure/BaseProcedures";
import Mtp from "./Mtp";
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
        }}
      >
        {/* <MtpUpdate /> */}
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        {/* <BaseProcedureAdd /> */}
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
        {/* <BaseProcedures /> */}
      </Paper>
    </>
  );
};

export default MtpPage;
