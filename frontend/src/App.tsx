import React from 'react';
import './App.css';
import Login from './features/login/Login'
import OutlinedCard from './components/card/OutlinedCard'
import MenuAppBar from './components/header/MenuAppBar';
import { observer } from 'mobx-react-lite';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStore } from './hooks/useStore';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const { authStore } = useStore()

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <MenuAppBar />
        {authStore.isAuth ? (
          <OutlinedCard />
        ) : (
          <Login />
        )}
      </div>
    </ThemeProvider>
  );
}

export default observer(App);
