import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

const Process = () => {
  const { processStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    processStore.getProcess(id);
  }, [id]);

  return (
    <>
      <div>Procedure: {processStore.process?.procedure_id}</div>
      <div>Worker: {processStore.process?.worker_id}</div>
      <div>Time begin: {processStore.process?.time_begin}</div>
      <div>Time finish: {processStore.process?.time_finish}</div>
      <div>Comment: {processStore.process?.comment}</div>
    </>
  );
};

export default observer(Process);
