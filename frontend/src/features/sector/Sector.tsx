import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const Sector = () => {
  const { sectorStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    sectorStore.getSector(id);
  }, [id]);

  return (
    <>
      <div>Step: {sectorStore.sector?.step}</div>
      <div>Sector: {sectorStore.sector?.title}</div>
      <div>Department: {sectorStore.sector?.department?.title}</div>
    </>
  );
};

export default observer(Sector);
