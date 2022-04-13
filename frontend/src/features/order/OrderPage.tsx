import Paper from "@mui/material/Paper";
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
        {/* <OrderUpdate /> */}
      </Paper>
    </>
  );
};

export default OrderPage;
