import React, {useState, useEffect} from 'react'
import "./Answers.css"
import { useFetching } from '../hooks/useFetching'
import AppService from '../API/AppService'
import { store } from '../store'
import { getId } from '../store/auth/actionCreator'
import {useNavigate} from 'react-router-dom'


const Answers = ({id}) => {

    const router = useNavigate()
    const [form, setForm] = useState([])
    const [answers, setAnswers] = useState([])
    const user_id = store.dispatch(getId())

    const [page, setPage] = useState(0)

    const [fetchForm, isFormLoading, formError] = useFetching(async () => {
        const response = await AppService.getFormToAnsById(id);
        setForm(response.data)
        
      })
      
    
      useEffect( () => {
        fetchForm()
      }, [] )
      console.log(form)

      function ChangeAns( questionId, choiceId, checked) {
        var newAnswers = [...answers]
        if(checked) {
            newAnswers.push({
                "user": user_id,
                "question": questionId,
                "choice": choiceId
            })
            newAnswers = newAnswers.filter((answer, index) => {
                return index === newAnswers.findIndex(a => 
                    a.user === answer.user && a.question === answer.question && a.choice === answer.choice
                )
            })
        } else {
            newAnswers = newAnswers.filter(answer => {
                return !(answer.user === user_id && answer.question === questionId && answer.choice === choiceId);
            })
        }
        setAnswers(newAnswers)
        console.log(newAnswers)
        // setAnswers(newAnswers, () => {
        //     console.log(newAnswers); // Вывод обновленного значения answers
        // });
    
        console.log(checked)
    }

    async function sendAns(ans, page) {
        try {
            const response = await AppService.AnsForm(ans, id);
            console.log(response.data); 
            setAnswers([])
            if(page < form.pages.length - 1 ) {
                setPage(page + 1)
            } else {
                router(`/find/`)
            }

        } catch (error) {
            console.error(error);
        }
    }

    // async function sendAndClose(ans, page) {
    //     try {
    //         const response = await AppService.AnsForm(ans, id);
    //         console.log(response.data); 
    //         setAnswers([])
    //         if(page < form.pages.length - 1 ) {
    //             setPage(page + 1)
    //         }

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

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
                    {/* {form && form.questions ? ( */}
                    {form && form.pages && form.pages[page] && form.pages[page].questions ? (
                                form.pages[page].questions.map((question, index) => (
                                    <div className='form_editor_element'>
                                    
                                        {/* <input className='form_editor_element_label' type='text' value={question.title} /> */}
                                        <p className='a_form_editor_element_label'>{question.title}</p>
                                        
                                        {question.choices.map((opt, j) =>
                                        <div className='a_option'>
                                            {/* <input type={question.type} name={index} />
                                            <input className='form_editor_element_option' type='text' value={opt.name} /> */}
                                            <input type={question.type} name={index} onClick={(e) =>{ChangeAns(question.id, opt.id, e.target.checked)}}/>
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
                    {/* <div className='ans_b_div'>
                    <button className='ans_button'>Отправить</button>
                    </div> */}
                </div>

                <div className='ans_b_div'>
                    {form && form.pages && (page === form.pages.length - 1)
                    ?
                        <button type='button' className='ans_button' onClick={() => sendAns(answers, page)}>Завершить</button>
                    :
                        <button type='button' className='ans_button' onClick={() => sendAns(answers, page)}>Далее</button>
                    }
                     {/* <button type='button' className='ans_button' onClick={() => sendAns(answers, page)}>Далее</button> */}
                </div>
                
       
        </div>
        }
    </div>
  )
}

export default Answers