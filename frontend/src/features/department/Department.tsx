import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const Department = () => {
  const { departmentStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    departmentStore.getDepartment(id);
  }, [id]);

  return (
    <>
      <div>Department: {departmentStore.department?.title}</div>
    </>
  );
};

export default observer(Department);
