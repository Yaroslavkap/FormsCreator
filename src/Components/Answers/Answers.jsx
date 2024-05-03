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

    const [allAns, setAllAns] = useState([])

    const [page, setPage] = useState(0)

    const [mustSkip, setMustSkip] = useState([])

    //
    // const skip = [[{'id':2, 'name': 2}], [{'id':3, 'name': 3}]]
    // const pairs = [[{'id':709, 'name': 'name'}, {'id':1812, 'name': 'name'}], [{'id':665, 'name': 'name'}, {'id':1719, 'name': 'name'}]]
    // //


    const [fetchForm, isFormLoading, formError] = useFetching(async () => {
        const response = await AppService.getFormToAnsById(id);
        setForm(response.data)
        
      })
      
    
      useEffect( () => {
        fetchForm()
      }, [] )
      console.log(form)

    //   const skip = JSON.parse(form.hidden_pages)
    //   const pairs = JSON.parse(form.question_answer_pairs)
    //   console.log(skip)
    //   console.log(pairs)

      function getQuestionChoicePairs(data) {
        return data.map(item => [item.question, item.choice]);
      }
      function getSkipPairs(data) {
        return data.map(item => [item[0].id, item[1].id]);
      }

      function increasePage(page, mustSkip) {
        let newPage = page + 1
        while (mustSkip.some(arr => arr.includes(newPage))) {
            newPage++;
        }
        return newPage;
      }
    
    

      function skipDetector(skipPairs, realPairs, allSkip) {
        let indexes = [];
        skipPairs = getSkipPairs(skipPairs)

        console.log(skipPairs)
        console.log(realPairs)
        
        realPairs.forEach((pair) => {
            let index = skipPairs.findIndex((skipPair) => skipPair[0] === pair[0] && skipPair[1] === pair[1]);
            if (index !== -1) {
                indexes.push(index);
            }
        });
        let skipIndexes = []
        indexes.forEach(item => skipIndexes.push(allSkip[item]))
        skipIndexes = skipIndexes.flatMap(array => array.map(obj => obj.name - 1))
        //return allSkip.map((item, i) =>)
        return skipIndexes;
    }

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
        //console.log(getQuestionChoicePairs(newAnswers))
        // setAnswers(newAnswers, () => {
        //     console.log(newAnswers); // Вывод обновленного значения answers
        // });
    
        console.log(checked)
    }

    async function sendAns(ans, page) {
        try {
            let newAll = [...allAns]
            let newMustSkip = [...mustSkip]
            // const response = await AppService.AnsForm(ans, id);
            // console.log(response.data); 
            //setAnswers([])
            newAll.push([...ans])
            setAllAns([...newAll])
            console.log(newAll)
            //
            //console.log(skipDetector(pairs, getQuestionChoicePairs(ans), skip))
            
            const skip = JSON.parse(form.hidden_pages)
            const pairs = JSON.parse(form.question_answer_pairs)
            console.log(getSkipPairs(pairs))

            newMustSkip.push(skipDetector(pairs, getQuestionChoicePairs(ans), skip))
            console.log(newMustSkip)
            setMustSkip(newMustSkip)
            
            //if(page < form.pages.length - 1 ) {
            if (increasePage(page, newMustSkip) < form.pages.length) {
                //setPage(page + 1)
                setPage(increasePage(page, newMustSkip))
                
                setAnswers([])
            } else {
                const send = newAll.flat()
                const response = await AppService.AnsForm(send, id);
                console.log(response.data);
                router(`/find/`)
            }

        } catch (error) {
            console.error(error);
        }
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
                                        
                            </div>
                                ))
                            ) : (
                                <div>No questions available</div>
                    )}
                    
                    </div>
                    
                </div>

                <div className='ans_b_div'>
                    {form && form.pages && (page !== 0)
                    ?
                        <button type='button' className='ans_button' >Назад</button>
                    :
                        <div></div>
                    }

                    {/* {form && form.pages && (page === form.pages.length - 1) */}
                    {(form && form.pages && (increasePage(page, mustSkip) >= form.pages.length) )
                    ?
                        <button type='button' className='ans_button' onClick={() => sendAns(answers, page)}>Завершить</button>
                    :
                        <button type='button' className='ans_button' onClick={() => sendAns(answers, page)}>Далее</button>
                    }
                </div>
                
       
        </div>
        }
    </div>
  )
}

export default Answers