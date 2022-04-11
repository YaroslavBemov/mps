import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import SectorUpdate from "./SectorUpdate";

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

      <SectorUpdate />

    </>
  );
};

export default observer(Sector);
