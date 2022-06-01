import { Routes, Route } from "react-router-dom";
import Login from "../features/login/Login";
export default function LoggedOut() {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
