import React, {useEffect} from "react";
import cl from './Navbar.module.css'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import { store } from "../store";
import { getId } from "../store/auth/actionCreator";

const Navbar = function(props) {
     
    const isLoggedIn = useSelector(
      (state) => !!state.auth.authData.access
    );


    const user_id = store.dispatch(getId())
    const router = useNavigate()

  //   useEffect(() => {
  //     if (!isLoggedIn) {
  //         // Действия при изменении isLoggedIn на false
  //         console.log('isLoggedIn is now false');
  //         // Другие действия, например, перенаправление пользователя
  //         // router('/login');
  //     }
  // }, [isLoggedIn, router]);

    return(
      <div className={ cl.navbar }>
        <div className={cl.navbar_label}><font className={cl.label_font1}>MAI</font><font className={cl.label_font2}>forms</font></div>

        {isLoggedIn
            ?
            <ul className={cl.navbar_links}>
              <li><Link className={cl.links} to='/home'>Главное</Link></li>
              {/* <li><Link className={cl.links} onClick={() => router(`/my/${user_id}`) } >Мое</Link></li> */}
              <li className={cl.links} onClick={() => router(`/my/${user_id}`) }>Мое</li>
              <li><Link className={cl.links} to='/find'>Найти опрос</Link></li>
              <li><Link className={cl.links} to='/login' >Выход</Link></li>
            </ul>
            :
            <ul className={cl.navbar_links}>
              <li><Link className={cl.links} to='/home'>Главное</Link></li>
              {/* <li><Link className={cl.links} to='/login' >Мое</Link></li> */}
              <li><Link className={cl.links} to='/login' >Вход</Link></li>
          </ul>
            }
      
      </div>
    )
}

export default Navbar