import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

const Product = () => {
  const { productStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      await productStore.getProduct(id);
    };

    fetchProduct();
  }, []);

  return (
    <>
      <div>Product: {productStore.product?.title}</div>
    </>
  );
};

export default observer(Product);
