import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import OutlinedCard from "../components/card/OutlinedCard"
import Home from "../features/home/Home"

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
    component: OutlinedCard,
    icon: ShoppingCartIcon
  },
]
