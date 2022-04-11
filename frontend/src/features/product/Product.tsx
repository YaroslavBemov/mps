import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import ProductUpdate from "./ProductUpdate";

const Product = () => {
  const { productStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      await productStore.getProduct(id);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <div>{productStore.product?.title}</div>
      <ProductUpdate />
    </>
  );
};

export default observer(Product);
