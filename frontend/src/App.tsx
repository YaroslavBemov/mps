import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Login from './features/login/Login'
import OutlinedCard from './components/card/OutlinedCard'
import MenuAppBar from './components/header/MenuAppBar';

function App() {
  const [auth, setAuth] = useState(false)

  return (
    <div className="App">
      <MenuAppBar />
      {auth ? (
        <OutlinedCard />
      ) : (
        <Login />
      )}
      <Button onClick={()=>setAuth(!auth)}>auth</Button>
    </div>
  );
}

export default App;
