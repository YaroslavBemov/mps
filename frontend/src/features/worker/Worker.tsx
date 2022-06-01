import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const Worker = () => {
  const { workerStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    workerStore.getWorker(id);
  }, [id]);

  return (
    <>
      <div>Title: {workerStore.worker?.title}</div>
      <div>Sector: {workerStore.worker?.sector?.title}</div>
    </>
  );
};

export default observer(Worker);
