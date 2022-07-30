import React, { Component } from 'react';
import { Router } from 'react-router-dom';

import './App.css';

import Routes from './routes/Router';

class App extends Component {
  render() {
    return (
      <div className="App">

     <Routes/>
      </div>
    );
  }
}

export default App;