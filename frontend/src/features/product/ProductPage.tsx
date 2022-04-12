import Paper from "@mui/material/Paper";

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
        }}
      >
        <ProductUpdate />
      </Paper>
    </>
  );
};

export default ProductPage;
