import React, {useEffect} from 'react'
import image from '../photos/soc2.jpg'
import image2 from '../photos/soc9.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { IoShareSocial } from "react-icons/io5";
import { TbFileExport } from "react-icons/tb";
import { TbBinaryTree } from "react-icons/tb";
import { FaMousePointer } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { store } from '../store'
import { getId } from '../store/auth/actionCreator'


function Home() {
  useEffect(() => {
    AOS.init({duration: 1000})
  }, [])

  const isLoggedIn = useSelector(
    (state) => !!state.auth.authData.access
  );

  const router = useNavigate()

  const user_id = store.dispatch(getId())

  return (
    <div className='home_content'>

      <div className='home_image' style={{backgroundImage:`url(${image})`}} >
        <div className='home_image_label'>
        <h1>Удобный конструктор опросов и форм обратной связи</h1>
        </div>
      </div>

      <div className='home_main'>

      <div className='home_main_box'>

        <p className='home_main_label' data-aos="zoom-out" data-aos-offset="300">Создавай опросы без лишних усилий в MAIforms</p>

        <div className='home_form'>
          <div className='home_form_element' data-aos="zoom-in" data-aos-offset="300">

            <IconContext.Provider value={{ size: '4rem', className: "global-class-name", color:'rgb(115,47,249 )' }}>
              <FaMousePointer />
            </IconContext.Provider>
            
            <p className='home_form_element_label'>Удобство использования</p>
          </div>

          <div className='home_form_element' data-aos="zoom-in" data-aos-offset="300">
          <IconContext.Provider value={{ size: '4rem', className: "global-class-name", color:'rgb(115,47,249 )' }}>
            <TbFileExport />
          </IconContext.Provider>
            
            <p className='home_form_element_label'> Экспорт результатов</p>
          </div>

          <div className='home_form_element' data-aos="zoom-in" data-aos-offset="200">
          <IconContext.Provider value={{ size: '4rem', className: "global-class-name", color:'rgb(115,47,249 )' }}>
            <TbBinaryTree />
          </IconContext.Provider>
          <p className='home_form_element_label'>Система логики опроса</p>
          </div>

          <div className='home_form_element' data-aos="zoom-in" data-aos-offset="200">
            <IconContext.Provider value={{ size: '4rem', className: "global-class-name", color:'rgb(115,47,249 )' }}>
              <IoShareSocial/>
            </IconContext.Provider>
            <p className='home_form_element_label' style={{textAlign:"center"}}>Простое распространение</p>
          </div>

        </div>
      </div>

      </div>

      <div className='home_image2' style={{backgroundImage:`url(${image2})`}} >
        <div className='home_image2_label'>
        <h1 data-aos="zoom-in-up" data-aos-offset="100" data-aos-duration="2000">Собирай статистику лучшим способом</h1>
        </div>
      </div>

      <div className='home_ending'>
        <p className='home_ending_label'>Начни прямо сейчас</p>
        {/* <p className='home_ending_label'>...</p> */}
        {/* <button className='home_start_btn' type='button'>Начать</button> */}
        {isLoggedIn
        ?
        <button className='home_start_btn' type='button' onClick={() => router(`/my/${user_id}`) }>Начать</button>
        :
        <button className='home_start_btn' type='button' onClick={() => router(`/login`) }>Начать</button>
        }
      </div>

      {/* <div>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        
      </div> */}
      
    </div>
  )
}

export default Home