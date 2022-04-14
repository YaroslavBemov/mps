import Paper from "@mui/material/Paper";
import Production from "../production/Production";
import Order from "./Order";
import OrderUpdate from "./OrderUpdate";

const OrderPage = () => {
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
        <Order />
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <OrderUpdate />
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <Production />
      </Paper>
    </>
  );
};

export default OrderPage;
