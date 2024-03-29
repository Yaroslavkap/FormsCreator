import React, {useState, useEffect} from 'react'
import "./Answers.css"
import { useFetching } from '../hooks/useFetching'
import AppService from '../API/AppService'
import { store } from '../store'
import { getId } from '../store/auth/actionCreator'


const Answers = ({id}) => {
    const [form, setForm] = useState([])
    const [answers, setAnswers] = useState([])
    const user_id = store.dispatch(getId())

    const [fetchForm, isFormLoading, formError] = useFetching(async () => {
        const response = await AppService.getFormToAnsById(id);
        setForm(response.data)
        
      })
      
    
      useEffect( () => {
        fetchForm()
      }, [] )
      console.log(form)

      function ChangeAns(index, questionId, choiceId) {
        var newAnswers = {...answers}
        newAnswers[index] = {
            "user": user_id,
            "question": questionId,
            "choice": choiceId
        }
        setAnswers(newAnswers)
        console.log(answers)
    }
  return (
    // <div className='ans'>Answers {id}</div>
    <div>
        {isFormLoading
            ?
            <div >
                Loading
            </div>
            :
            <div className='a_form_page'>
                <div className='form_page_main'>

                    <div className='a_form_page_main_top'>
                        {/* <input className='form_editor_element_label' type='text' value={form.title}/>
                        <input className='form_editor_element_option' type='text' value={form.description} /> */}
                        <p className='a_form_editor_element_label' >{form.title}</p>
                        <p className='a_form_editor_element_option'>{form.description}</p>

                    </div>
                    
                    
                    <div className='form_editor'>
                    {form && form.questions ? (
                                form.questions.map((question, index) => (
                                    <div className='form_editor_element'>
                                    
                                        {/* <input className='form_editor_element_label' type='text' value={question.title} /> */}
                                        <p className='a_form_editor_element_label'>{question.title}</p>
                                        
                                        {question.choices.map((opt, j) =>
                                        <div className='a_option'>
                                            {/* <input type={question.type} name={index} />
                                            <input className='form_editor_element_option' type='text' value={opt.name} /> */}
                                            <input type={question.type} name={index} onChange={() =>{ChangeAns(index, question.id, opt.id)}}/>
                                            <span className='a_form_editor_element_option'>{opt.name}</span>
                                        </div>
                                        )}
                                        
                                        {/* <div onClick={() => addOption(index)}>Добавить вариант ответа</div> */}
                                        {/* <button className='new_option_button' type='button' onClick={() => addChoice(index)}>Добавить</button>  */}
                            </div>
                                ))
                            ) : (
                                <div>No questions available</div>
                    )}
                    
                    </div>
                    {/* <button>hhhh</button> */}
                    {/* <div className='ans_b_div'>
                    <button className='ans_button'>Отправить</button>
                    </div> */}
                </div>

                <div className='ans_b_div'>
                    <button className='ans_button'>Отправить</button>
                </div>
                
       
        </div>
        }
    </div>
  )
}

export default Answers