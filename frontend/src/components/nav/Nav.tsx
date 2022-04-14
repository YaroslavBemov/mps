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
import ListAltIcon from '@mui/icons-material/ListAlt';
import StorageIcon from '@mui/icons-material/Storage';

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
      <hr />
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1, 'departments')}
      >
        <ListItemIcon>
          <FactoryIcon />
        </ListItemIcon>
        <ListItemText primary='Departments' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2, 'sectors')}
      >
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary='Sectors' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3, 'products')}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary='Products' />
      </ListItemButton>
      <hr />
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4, 'base-mtps')}
      >
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary='Base MTPs' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 5}
        onClick={(event) => handleListItemClick(event, 5, 'base-procedures')}
      >
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary='Base procedures' />
      </ListItemButton>
      <hr />
      <ListItemButton
        selected={selectedIndex === 6}
        onClick={(event) => handleListItemClick(event, 6, 'orders')}
      >
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary='Orders' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 7}
        onClick={(event) => handleListItemClick(event, 7, 'mtps')}
      >
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary='MTPs' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 8}
        onClick={(event) => handleListItemClick(event, 8, 'procedures')}
      >
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary='Procedures' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 9}
        onClick={(event) => handleListItemClick(event, 9, 'processes')}
      >
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary='Processes' />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 10}
        onClick={(event) => handleListItemClick(event, 10, 'workers')}
      >
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary='Workers' />
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
