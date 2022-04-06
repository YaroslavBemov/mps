import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Home from "../features/home/Home"
import Product from '../features/product/product';

export const routes = [
  {
    path: '/',
    sidebarName: 'Dashboard',
    component: Home,
    icon: DashboardIcon
  },
  {
    path: 'products',
    sidebarName: 'Products',
    component: Product,
    icon: ShoppingCartIcon
  },
]
