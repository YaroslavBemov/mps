import Paper from "@mui/material/Paper";
import OrderAdd from "./OrderAdd";
import Orders from "./Orders";

const OrdersPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <OrderAdd />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          // p: 2,
          mb: 2,
        }}
      >
        <Orders />
      </Paper>
    </>
  );
};

export default OrdersPage;
