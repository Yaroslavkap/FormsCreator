import React, {useState, useEffect} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Components/AppRouter';
import { store } from './Components/store';
import {useSelector} from 'react-redux';
import AppService from './Components/API/AppService';
import { getAccessToken } from './Components/store/auth/actionCreator';
import { useDispatch} from 'react-redux'
import { getProfile } from './Components/API/Auth';
import { loginSucess } from './Components/store/auth/authReducer';
import { loginUser } from './Components/store/auth/actionCreator';

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

  // const dispatch = useDispatch();
  // const token = store.dispatch(getAccessToken());

  // useEffect(() => {
  //   //const token = store.getState().token;
  //   console.log(token)
  //   dispatch(loginSucess(token))
  // }, [dispatch]);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  //   useEffect(() => {
  //       const checkAuth = async () => {
  //         const token = store.dispatch(getAccessToken());
  //         console.log(token)
  //           if (token) {
  //               // Проверьте токен на сервере, если это необходимо
  //               const response = await AppService.checkToken()
  //               console.log(response)

  //               if (response.ok) {
  //                   setIsAuthenticated(true);
  //               } else {
  //                   //localStorage.removeItem('authToken');
  //                   setIsAuthenticated(false);
  //               }
  //           } else {
  //               setIsAuthenticated(false);
  //           }
  //       };

  //       checkAuth();
  //   }, []);

  // const dispatch = useDispatch()

  // const Submit = () => {
    
  //   const post = {
  //       "username": "admin",
  //       "password": "1234"
  //   }
  //   dispatch(loginUser(post)) 
  // }

  //   useEffect(() => {
  //       Submit();
  //   }, []);

  
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
