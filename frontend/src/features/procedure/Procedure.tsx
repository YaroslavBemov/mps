import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const Procedure = () => {
  const { procedureStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    procedureStore.getProcedure(id);
  }, [id]);

  return (
    <>
      <div>Position: {procedureStore.procedure?.position}</div>
      <div>Title: {procedureStore.procedure?.title}</div>
      <div>Sector: {procedureStore.procedure?.sector?.title}</div>
      <div>Status: {procedureStore.procedure?.status?.title}</div>
      <div>Comment: {procedureStore.procedure?.comment}</div>
    </>
  );
};

export default observer(Procedure);
