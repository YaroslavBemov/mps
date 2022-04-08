import Home from "../features/home/Home"
import Products from '../features/product/Products';
import Product from '../features/product/Product';

import Layout from '../features/layout/Layout'
import NoMatch from '../features/no-match/No-match';
import Departments from "../features/department/Departments";
import Department from "../features/department/Department";

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
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <Product />
      },
      {
        path: 'departments',
        element: <Departments />,
      },
      {
        path: 'departments/:id',
        element: <Department />
      }
    ]
  },
  {
    path: '*',
    element: <NoMatch />
  }
]
