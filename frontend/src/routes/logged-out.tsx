import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../features/login/Login'
export default function LoggedOut() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
