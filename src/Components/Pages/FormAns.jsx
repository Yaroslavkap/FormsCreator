import React from 'react'
import Answers from '../Answers/Answers'
import {useParams} from 'react-router-dom'


const FormAns = () => {
    const params = useParams()
  return (
    <div><Answers id = {params.id}/></div>
  )
}

export default FormAns