import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Home from "../features/home/Home"
import Products from '../features/product/Products';
import Product from '../features/product/Product';

import Layout from '../features/layout/Layout'
import NoMatch from '../features/no-match/No-match';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        // sidebarName: 'Dashboard',
        // icon: DashboardIcon,
      },
      {
        path: 'products',
        element: <Products />,
        // sidebarName: 'Products',
        // icon: ShoppingCartIcon,
      },
      {
        path: 'products/:id',
        element: <Product />
      }
    ]
  },
  {
    path: '*',
    element: <NoMatch />
  }
]
