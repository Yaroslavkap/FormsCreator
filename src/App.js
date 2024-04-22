import React, {useState, useEffect} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Components/AppRouter';
import { store } from './Components/store';
import {useSelector} from 'react-redux';

function App() {
  // const isLoggedIn = useSelector(
  //   (state) => !!state.auth.authData.access
  // );

  // useEffect(() => {
  //   const token = store.dispatch(getAccessToken());
  //   if (token) {
  //     // Авторизация пользователя
  //     //const isLoggedIn = useSelector((state) => !!state.auth.authData.access);
  //     if (!isLoggedIn) {
        
  //     }
  //   }
  // }, []);
  
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
