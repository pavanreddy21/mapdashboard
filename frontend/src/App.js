import React, { Component } from 'react';
import './App.css';
import Home from './OKRComponents/Home.js'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Home/>
      </BrowserRouter>
    );
  }
}

export default App;
