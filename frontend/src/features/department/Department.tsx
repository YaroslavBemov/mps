import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import Sectors from "../sector/Sectors";
import DepartmentUpdate from "./DepartmentUpdate";

const Department = () => {
  const { departmentStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    departmentStore.getDepartment(id);
  }, [id]);

  return (
    <>
      <div>Department: {departmentStore.department?.title}</div>
      <DepartmentUpdate />
      <hr />
      <Sectors />
    </>
  );
};

export default observer(Department);
