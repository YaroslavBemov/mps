import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FactoryIcon from '@mui/icons-material/Factory';
import CategoryIcon from '@mui/icons-material/Category';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const Nav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate()

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    path: string
  ) => {
    setSelectedIndex(index);
    navigate(path)
  };

  return (
    <>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0, '/')}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1, 'products')}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary='Products' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2, 'departments')}
      >
        <ListItemIcon>
          <FactoryIcon />
        </ListItemIcon>
        <ListItemText primary='Departments' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3, 'sectors')}
      >
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary='Sectors' />
      </ListItemButton>
    </>
  )
}

export default Nav

// {
//   routes.map((route, index) => (
//     <ListItemButton
//       selected={selectedIndex === route.path}
//       onClick={(event) => handleListItemClick(event, route.path, route.sidebarName)}
//       key={index}
//     >
//       <ListItemIcon>
//         {<route.icon />}
//       </ListItemIcon>
//       <ListItemText primary={route.sidebarName} />
//     </ListItemButton>
//   ))
// }
