import React, {useState} from 'react'
import "./FindPage.css"
import {useNavigate} from 'react-router-dom'

const FindPage = () => {
    const router = useNavigate()
    const [num, setNum] = useState('')
    // console.log(num)
  return (
    <div className='find'>
        <form className='find_form'>
            <h1>Найти опрос</h1>
            <div className='find_number'>
                <label>Код опроса:</label>
                <input type='text' placeholder='введите код' value={num} onChange={e => setNum(e.target.value)}/>
            </div>


            <button type='button' className='find_button' onClick={() => router(`/ans/${num}`) }>Перейти</button>

        </form>
    </div>
  )
}

export default FindPage