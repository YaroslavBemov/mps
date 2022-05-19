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
      <div>Worker: {processStore.process?.worker?.title}</div>
      <div>Procedure: {processStore.process?.procedure?.title}</div>
      <div>Status: {processStore.process?.status?.title}</div>
      <div>Comment: {processStore.process?.comment}</div>
    </>
  );
};

export default observer(Process);
