import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

const Mtp = () => {
  const { mtpStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    mtpStore.getMtp(id);
  }, [id]);

  return (
    <>
      <div>Order title: {mtpStore.mtp?.order?.title}</div>
      <div>Serial: {mtpStore.mtp?.serial}</div>
    </>
  );
};

export default observer(Mtp);
