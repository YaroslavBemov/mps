import Paper from "@mui/material/Paper";
import BaseMTPAdd from "../base-mtp/BaseMTPAdd";
import BaseMTPs from "../base-mtp/BaseMTPs";

import Product from "./Product";
import ProductUpdate from "./ProductUpdate";

const ProductPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <Product />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <ProductUpdate />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <BaseMTPAdd />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <BaseMTPs />
      </Paper>
    </>
  );
};

export default ProductPage;
