import Sectors from "../sector/Sectors"
import Department from "./Department"
import DepartmentUpdate from "./DepartmentUpdate"

const DepartmentPage = () => {
  return (
    <>
      <Department />
      <hr />
      <DepartmentUpdate />
      <hr />
      <Sectors />
    </>
  )
}

export default DepartmentPage
