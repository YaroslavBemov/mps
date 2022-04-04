import React, { useState } from 'react';
import './App.css';
import Login from './features/login/Login'
import OutlinedCard from './components/card/OutlinedCard'
import MenuAppBar from './components/header/MenuAppBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const { store } = React.useContext(Context);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <MenuAppBar />
        {store.authStore.isAuth ? (
          <OutlinedCard />
        ) : (
          <Login />
        )}
      </div>
    </ThemeProvider>
  );
}

export default observer(App);
