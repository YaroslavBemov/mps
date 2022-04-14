import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
      <div>Sector: {procedureStore.procedure?.sector_id}</div>
      <div>Status: {procedureStore.procedure?.status_id}</div>
      <div>Comment: {procedureStore.procedure?.comment}</div>
    </>
  );
};

export default observer(Procedure);
