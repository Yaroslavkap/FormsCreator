import React from "react";
import cl from './Navbar.module.css'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";

const Navbar = function(props) {
     
    const isLoggedIn = useSelector(
      (state) => !!state.auth.authData.access
    );

    return(
      <div className={ cl.navbar }>
        <div className={cl.navbar_label}><font className={cl.label_font1}>MAI</font><font className={cl.label_font2}>forms</font></div>

        {isLoggedIn
            ?
            <ul className={cl.navbar_links}>
              <li><Link className={cl.links} to='/home'>Главное</Link></li>
              <li><Link className={cl.links} to='/my' >Мое</Link></li>
              <li><Link className={cl.links} to='/login' >Выход</Link></li>
            </ul>
            :
            <ul className={cl.navbar_links}>
              <li><Link className={cl.links} to='/home'>Главное</Link></li>
              <li><Link className={cl.links} to='/login' >Мое</Link></li>
              <li><Link className={cl.links} to='/login' >Вход</Link></li>
          </ul>
            }
      
      </div>
    )
}

export default Navbar