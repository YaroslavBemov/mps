import Home from "../features/home/Home"

import Layout from '../features/layout/Layout'
import NoMatch from '../features/no-match/No-match';
import DepartmentsPage from "../features/department/DepartmentsPage";
import DepartmentPage from "../features/department/DepartmentPage";
import SectorsPage from "../features/sector/SectorsPage";
import SectorPage from "../features/sector/SectorPage";
import ProductsPage from "../features/product/ProductsPage";
import ProductPage from "../features/product/ProductPage";
import BaseMTPPage from '../features/base-mtp/BaseMTPPage'
import BaseMTPsPage from '../features/base-mtp/BaseMTPsPage'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductPage />
      },
      {
        path: 'departments',
        element: <DepartmentsPage />,
      },
      {
        path: 'departments/:id',
        element: <DepartmentPage />
      },
      {
        path: 'sectors',
        element: <SectorsPage />,
      },
      {
        path: 'sectors/:id',
        element: <SectorPage />
      },
      {
        path: 'base-mtps',
        element: <SectorsPage />,
      },
      {
        path: 'base-mtps/:id',
        element: <BaseMTPPage />
      }
    ]
  },
  {
    path: '*',
    element: <NoMatch />
  }
]
