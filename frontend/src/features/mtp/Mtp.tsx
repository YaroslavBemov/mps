import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

const Mtp = () => {
  const { mtpStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    const fetchMtp = async () => {
      await mtpStore.getMtp(id);
    }
    fetchMtp()
    // TODO rework
    return () => { mtpStore.clearMtp() }
  }, [id]);

  return (
    <>
      <div>Order title: {mtpStore.mtp?.order?.title}</div>
      <div>Serial: {mtpStore.mtp?.serial}</div>
    </>
  );
};

export default observer(Mtp);
