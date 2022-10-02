import React from 'react';
import './App.css';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import TemplatePicker from './components/TemplatePicker/component';
import MainContainer from './components/MainContainer/component';
import { AppToolBar } from './components/AppToolBar/component';
import { AppContainer } from './components/AppContainer/components';

function App() {
  return (
    <div className="App">
      <AppContainer></AppContainer>
    </div>
  );
}

export default App;
