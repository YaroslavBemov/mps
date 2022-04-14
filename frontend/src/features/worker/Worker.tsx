import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
      <div>Sector: {workerStore.worker?.sector_id}</div>
    </>
  );
};

export default observer(Worker);
