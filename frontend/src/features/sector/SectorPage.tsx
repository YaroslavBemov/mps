import Paper from "@mui/material/Paper";
import Sector from "./Sector";
import SectorUpdate from "./SectorUpdate";

const SectorPage = () => {
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
        <Sector />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <SectorUpdate />
      </Paper>
    </>
  );
};

export default SectorPage;
