import Paper from "@mui/material/Paper";

import SectorAdd from "./SectorAdd";
import Sectors from "./Sectors";

const SectorsPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <SectorAdd />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <Sectors />
      </Paper>
    </>
  );
};

export default SectorsPage;
