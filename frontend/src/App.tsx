import React from 'react';
import './App.css';
import Login from './features/login/Login'
import TableTest from './components/dataGridTest/TableTest'
import MenuAppBar from './components/header/MenuAppBar';
import { observer } from 'mobx-react-lite';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStore } from './hooks/useStore';


function App() {
  const { authStore, uiStore } = useStore()
  const {mode} = uiStore
  
  const theme = createTheme({
    palette: {
      mode
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MenuAppBar />
        {authStore.isAuth ? (
          <TableTest />
        ) : (
          <Login />
        )}
      </div>
    </ThemeProvider>
  );
}

export default observer(App);
