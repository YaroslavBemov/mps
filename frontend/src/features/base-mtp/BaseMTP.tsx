import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

const BaseMTP = () => {
  const { baseMTPStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    baseMTPStore.getBaseMTP(id);

    return () => {
      baseMTPStore.clearBaseMTP();
    };
  }, [id]);

  return (
    <>
      <div>Title: {baseMTPStore.baseMTP?.title}</div>
      <div>Product: {baseMTPStore.baseMTP?.product?.title}</div>
    </>
  );
};

export default observer(BaseMTP);
