import React, { useState } from 'react'
import "./Login.css"
//import { useAppDispatch } from '../store'
import { loginUser, logoutUser } from '../store/auth/actionCreator'
import { useDispatch,  useSelector} from 'react-redux'

const Login = () => {

    const isLoggedIn = useSelector(
        (state) => !!state.auth.authData.access
      );
      console.log(isLoggedIn)

    // const dispatch = useAppDispatch()
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const post = {
            "username": login,
            "password": password
        }
        //console.log(JSON.stringify(post))
        dispatch(loginUser(post))
        //dispatch(loginUser(""))
        //console.log(JSON.stringify(post))
        //dispatch(loginUser({login, password}))
    }

  return (
    <div className='login'>
        {isLoggedIn
        ?
        <div>
            <h1>Вы успешно авторизованы</h1>
            <button type='button' onClick={() => dispatch(logoutUser())}>Выйти</button>
        </div>
        
        :
        <form onSubmit={handleSubmit} className='log_form'>
            <div>
                <label htmlFor='login'>Логин:</label>
                <input name='login' type='text' placeholder='введите логин' value={login} onChange={e => setLogin(e.target.value)}/>
            </div>

            <div>
                <label htmlFor='password'>Пароль:</label>
                <input name='password' type='password' placeholder='введите пароль' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>

            <button>Войти</button>

        </form>
        }
        
    </div>
  )
}

export default Login