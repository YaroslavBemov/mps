import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const BaseProcedure = () => {
  const { baseProcedureStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    baseProcedureStore.getBaseProcedure(id);
  }, [id]);

  return (
    <>
      <div>MTP: {baseProcedureStore.baseProcedure?.baseMtp?.title}</div>
      <div>Sector: {baseProcedureStore.baseProcedure?.sector?.title}</div>
      <div>Position: {baseProcedureStore.baseProcedure?.position}</div>
      <div>Title: {baseProcedureStore.baseProcedure?.title}</div>
      <div>Time total: {baseProcedureStore.baseProcedure?.time_total}</div>
      <div>
        Time per product: {baseProcedureStore.baseProcedure?.time_per_product}
      </div>
      <div>Comment: {baseProcedureStore.baseProcedure?.comment}</div>
    </>
  );
};

export default observer(BaseProcedure);
