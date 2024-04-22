import My from "../Pages/My"
import Home from "../Pages/Home"
import FormPage from "../Pages/FormPage"
import Login from "../Login/Login"
import FormAns from "../Pages/FormAns"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import FindPage from "../Pages/FindPage/FindPage"
import Statistic from "../Pages/Statistic/Statistic"

// const isLoggedIn = useSelector(
//     (state) => !!state.auth.authData.accessToken
//   );

// const Logged = () => {
//     const isLoggedIn = useSelector(
//              (state) => !!state.auth.authData.accessToken
//     )
//     return isLoggedIn
// }

// export const allRoutes = [
//     {path: '/home', element: <Home/>, exact:true},
//     {path: '/my/:id', element: <My/>, exact:true},
//     {path: '/forms/:id', element: <FormPage/>, exact:true},
//     {path: '/ans/:id', element: <FormAns/>, exact:true},
//     {path: '/login', element: <Login/>, exact:true},
//     {path: '/find', element: <FindPage/>, exact:true},
//     {path: '/stat/:id', element: <Statistic/>, exact:true},
// ]

export const allRoutes = {
    privateRoutes: [
      {path: '/home', element: <Home/>, exact:true},
      {path: '/my/:id', element: <My/>, exact:true},
      {path: '/forms/:id', element: <FormPage/>, exact:true},
      {path: '/ans/:id', element: <FormAns/>, exact:true},
      {path: '/login', element: <Login/>, exact:true},
      {path: '/find', element: <FindPage/>, exact:true},
      {path: '/stat/:id', element: <Statistic/>, exact:true},
    ],
    publicRoutes: [
      {path: '/login', element: <Login/>, exact:true},
      {path: '/home', element: <Home/>, exact:true},
    ],
  };