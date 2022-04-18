import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

const Order = () => {
  const { orderStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    orderStore.getOrder(id);
  }, [id]);

  return (
    <>
      <div>Title: {orderStore.order?.title}</div>
      <div>Product: {orderStore.order?.product?.title}</div>
      <div>Base MTP: {orderStore.order.baseMtp.title}</div>
      <div>Count: {orderStore.order?.count}</div>
    </>
  );
};

export default observer(Order);
