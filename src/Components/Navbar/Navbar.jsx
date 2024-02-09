import React from "react";
import cl from './Navbar.module.css'
import {Link} from 'react-router-dom'

const Navbar = function(props) {
     

    return(
      <div className={ cl.navbar }>
        <div className={cl.navbar_label}><font className={cl.label_font1}>MAI</font><font className={cl.label_font2}>forms</font></div>
        <ul className={cl.navbar_links}>
            <li><Link className={cl.links} to='/home'>Главное</Link></li>
            
            <li><Link className={cl.links} to='/my' >Мое</Link></li>

            <li><Link className={cl.links} to='/form' >Форма</Link></li>
            
            
        </ul>
      
      </div>
    )
}

export default Navbar