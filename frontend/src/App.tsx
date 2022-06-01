import React, { useEffect } from "react";
import "./App.css";
import Login from "./features/login/Login";
import LoggedIn from "./routes/logged-in";
import { observer } from "mobx-react-lite";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useStore } from "./hooks/useStore";
// import AdminLine from './components/header/AdminLine';

function App() {
  const { authStore, uiStore } = useStore();
  const { mode } = uiStore;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      authStore.refresh();
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {authStore.isAuth ? <LoggedIn /> : <Login />}
        {/* <AdminLine /> */}
      </div>
    </ThemeProvider>
  );
}

export default observer(App);
