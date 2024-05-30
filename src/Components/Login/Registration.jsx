import React, { useState } from 'react'
import "./Login.css"
//import { useAppDispatch } from '../store'
import { loginUser } from '../store/auth/actionCreator'
import { useDispatch,  useSelector} from 'react-redux'
import { getRefToken, getAccessToken, getId } from '../store/auth/actionCreator';
import { store } from '../store';
import AppService from '../API/AppService';
import {Link} from 'react-router-dom'

const Registration = () => {

    const isLoggedIn = useSelector(
        (state) => !!state.auth.authData.access
      );
      //console.log(isLoggedIn)

    // const dispatch = useAppDispatch()
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const post = {
        //     "username": login,
        //     "password": password
        // }
        // dispatch(loginUser(post))
        // if(password === password2) {
        //     const post = {
        //         "username": login,
        //         "password": password
        //     }

        // }

        try {
            if(password === password2) {
                const post = {
                    "username": login,
                    // "email": "",
                    "password": password
                }
                const response = await AppService.register(post);
                console.log(response.data);

                dispatch(loginUser(post))

            } else {
                setError("Пароли не совпадают")
            }

        } catch (error) {
            console.error(error);
        }
        
    }

    // async function getRefresh() {
    //     const refreshToken = await store.dispatch(getRefToken())
    //     console.log(refreshToken)

    //     const user_id = await store.dispatch(getId())
    //     console.log(user_id)
    // }

    

  return (
    <div className='login'>
        
        <form onSubmit={handleSubmit} className='log_form reg_form'>
            <h1>Регистрация</h1>
            <div className='log'>
                <label htmlFor='login'>Логин:</label>
                <input name='login' type='text' placeholder='введите логин' value={login} onChange={e => setLogin(e.target.value)}/>
            </div>

            <div className='log'>
                <label htmlFor='password'>Пароль:</label>
                <input name='password' type='password' placeholder='введите пароль' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>

            <div>
                <label htmlFor='password2'>Повторите пароль:</label>
                <input name='password2' type='password' placeholder='введите пароль' value={password2} onChange={e => setPassword2(e.target.value)}/>
            </div>

            <div>
                <p>{error}</p>
            </div>

            {/* <div className='log_link'>
                <Link to='/home' >Регистрация</Link>
            </div> */}

            <button className='log_button'>Зарегистрироваться</button>

        </form>
        
    </div>
  )
}

export default Registration