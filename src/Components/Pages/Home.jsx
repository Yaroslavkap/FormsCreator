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


function Home() {
  useEffect(() => {
    AOS.init({duration: 1000})
  }, [])

  return (
    <div className='home_content'>

      <div className='home_image' style={{backgroundImage:`url(${image})`}} >
        <div className='home_image_label'>
        <h1 >Удобный конструктор опросов и форм обратной связи</h1>
        </div>
      </div>

      <div className='home_main'>

      <div className='home_main_box'>

        <h className='home_main_label' data-aos="zoom-out" data-aos-offset="300">Создавай опросы без лишних усилий в MAIforms</h>

        <div className='home_form'>
          <div className='home_form_element' data-aos="fade-right" data-aos-offset="300">

            <IconContext.Provider value={{ size: '4rem', className: "global-class-name", color:'rgb(115,47,249 )' }}>
              <FaMousePointer />
            </IconContext.Provider>
            
            <h className='home_form_element_label'>Удобство использования</h>
          </div>

          <div className='home_form_element' data-aos="fade-left" data-aos-offset="300">
          <IconContext.Provider value={{ size: '4rem', className: "global-class-name", color:'rgb(115,47,249 )' }}>
            <TbFileExport />
          </IconContext.Provider>
            
            <h className='home_form_element_label'> Экспорт результатов</h>
          </div>

          <div className='home_form_element' data-aos="fade-right" data-aos-offset="200">
          <IconContext.Provider value={{ size: '4rem', className: "global-class-name", color:'rgb(115,47,249 )' }}>
            <TbBinaryTree />
          </IconContext.Provider>
          <h className='home_form_element_label'>Система логики опроса</h>
          </div>

          <div className='home_form_element' data-aos="fade-left" data-aos-offset="200">
            <IconContext.Provider value={{ size: '4rem', className: "global-class-name", color:'rgb(115,47,249 )' }}>
              <IoShareSocial/>
            </IconContext.Provider>
            <h className='home_form_element_label'>Простое распространение</h>
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
        <h className='home_ending_label'>Начни прямо сейчас</h>
        <h className='home_ending_label'>...</h>
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