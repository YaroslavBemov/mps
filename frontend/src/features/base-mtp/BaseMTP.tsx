import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

const BaseMTP = () => {
  const { baseMTPStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    baseMTPStore.getBaseMTP(id);
  }, [id]);

  return (
    <>
      <div>Department: {baseMTPStore.baseMTP?.title}</div>
    </>
  );
};

export default observer(BaseMTP);
