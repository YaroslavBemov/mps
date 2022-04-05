import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import Layout from '../features/layout/Layout'
import Home from '../features/home/Home'
import NoMatch from '../features/no-match/No-match'
export default function LoggedIn() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {routes.map((route, index) => (
            <Route path={route.path} element={<route.component />} key={index} />
          ))}
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  )
}
