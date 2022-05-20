import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const date = new Date();
const dd = String(date.getDate()).padStart(2, "0");
const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = date.getFullYear();

const today = mm + "/" + dd + "/" + yyyy;

function Deposits() {
  const { productionStore, authStore } = useStore();

  React.useEffect(() => {
    productionStore.getTotalProduction();
  }, [authStore.roleId]);
  return (
    <React.Fragment>
      <Title>Today Total</Title>
      <Typography component="p" variant="h2" sx={{ mt: 4 }}>
        {productionStore.totalProduction.total}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, mt: 4 }}>
        {today}
      </Typography>
    </React.Fragment>
  );
}

export default observer(Deposits);
