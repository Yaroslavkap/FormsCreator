import React, {useState, useEffect} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Components/AppRouter';

function App() {
  return (
    <div color="black" className="App">
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
