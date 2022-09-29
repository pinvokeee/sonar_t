import React from 'react';
import './App.css';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import AppToolBar from './components/AppToolBar/component';
import TemplatePicker from './components/TemplatePicker/component';
import MainContainer from './components/MainContainer/component';
import { Context, initialContext } from './context/store';

function App() {
  return (
    <div className="App">
      <Context.Provider value={initialContext}>
        <AppToolBar></AppToolBar>
        <MainContainer>
          <TemplatePicker></TemplatePicker>
        </MainContainer>
      </Context.Provider>


    </div>
  );
}

export default App;
