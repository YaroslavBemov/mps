import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const Order = () => {
  const { orderStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    orderStore.getOrder(id);

    return () => {
      orderStore.clearOrder();
    };
  }, [id]);

  return (
    <>
      <div>Title: {orderStore.order?.title}</div>
      <div>Product: {orderStore.order?.product?.title}</div>
      <div>Base MTP: {orderStore.order?.baseMtp?.title}</div>
      <div>Count: {orderStore.order?.count}</div>
      <div>Created: {orderStore.order?.is_created ? "YES" : "NO"}</div>
      <div>Started: {orderStore.order?.is_started ? "YES" : "NO"}</div>
    </>
  );
};

export default observer(Order);
