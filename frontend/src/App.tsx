import React from 'react';
import './App.css';
import LoggedOut from './routes/logged-out'
import LoggedIn from './routes/logged-in'
import { observer } from 'mobx-react-lite';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStore } from './hooks/useStore';
// import AdminLine from './components/header/AdminLine';


function App() {
  const { authStore, uiStore } = useStore()
  const { mode } = uiStore

  const theme = createTheme({
    palette: {
      mode
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {authStore.isAuth ? (
          <LoggedIn />
        ) : (
          <LoggedOut />
        )}
        {/* <AdminLine /> */}
      </div>
    </ThemeProvider>
  );
}

export default observer(App);
