import Paper from "@mui/material/Paper";
import ProductAdd from "./ProductAdd";
import Products from "./Products";

const ProductPage = () => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <ProductAdd />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <Products />
      </Paper>
    </>
  );
};

export default ProductPage;
