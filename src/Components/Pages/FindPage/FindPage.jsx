import React, {useState} from 'react'
import "./FindPage.css"
import {useNavigate} from 'react-router-dom'
import AppService from '../../API/AppService'

const FindPage = () => {
    const router = useNavigate()
    const [num, setNum] = useState('')
    const [error, setError] = useState('')
    // console.log(num)

    async function RouteTo(id) {
      try {
        const response = await AppService.getFormById(id);
        if (response.data.is_submit) {
          router(`/ans/${id}`);
        } else {
          setError('Опрос не опубликован')
        }
        
      } catch (error) {
        setError('Опрос не найден')
        return error;
      }
    }
    

  return (
    <div className='find'>
        <form className='find_form'>
            <h1>Найти опрос</h1>
            <div className='find_number'>
                <label>Код опроса:</label>
                <input type='text' placeholder='введите код' value={num} onChange={e => setNum(e.target.value)}/>
                <p className='find_error'>{error}</p>
            </div>


            <button type='button' className='find_button' onClick={() => RouteTo(num) }>Перейти</button>

        </form>
    </div>
  )
}

export default FindPage