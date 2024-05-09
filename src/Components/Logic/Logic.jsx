import React, {useState, useEffect} from 'react'
import './Logic.css'
import AppService from '../API/AppService'

const Logic = ({myForm}) => {
    const [form, setForm] = useState([])
    //const [page, setPage] = useState(0)

    const [pairs, setPairs] = useState([])
    const [skip, setSkip] = useState([])

    const [openedMoreIndex, setOpenedMoreIndex] = useState({ page: -1, question: -1 });

    const toggleMore = (pageIndex, questionIndex) => {
        setOpenedMoreIndex((prevState) => {
        if (prevState.page === pageIndex && prevState.question === questionIndex) {
            return { page: -1, question: -1 }; // Закрываем блок
        } else {
            return { page: pageIndex, question: questionIndex }; // Открываем блок
        }
        });
        const arrayOfArrays = [];
        for (let i = 0; i < form.pages[pageIndex].questions[questionIndex].choices.length; i++) {
        arrayOfArrays.push([]);
        }
        setPairs([...arrayOfArrays])
        setSkip([...arrayOfArrays])
    };

    useEffect( () => {
        setForm(myForm)
    }, [] )
    console.log(form)

    
    function makePair(questionId, choiceId, checked, index, questionName, choiceName) {
        let newPairs = [...pairs];
      
        if (checked) {
          // Проверяем, есть ли уже такая пара в массиве
          const existingPair = newPairs.find(pair => pair[0] === questionId && pair[1] === choiceId);
          if (!existingPair) {
            //newPairs.push([questionId, choiceId]);
            //newPairs[index] = [questionId, choiceId]
            newPairs[index] = [{'id': questionId, 'name': questionName}, {'id': choiceId, 'name': choiceName}]
          }
        } else {
          // Удаляем пару из массива, если она существует
          //newPairs = newPairs.filter(pair => !(pair[0] === questionId && pair[1] === choiceId));
          newPairs[index] = []
        }
      
        setPairs(newPairs);
        console.log(newPairs);
        console.log(checked);
      }

      function makeSkip(pageId, checked, choiceIndex, pageName) {
        let newSkip = [...skip]
        if(checked) {
            newSkip[choiceIndex].push({'id': pageId, 'name': pageName})
        } else {
            newSkip[choiceIndex] = newSkip[choiceIndex].filter(item => item !== pageId)
        }

        setSkip(newSkip)
        console.log(newSkip)
        console.log(checked)
      }


    async function saveLogic(pageIndex, questionIndex) {
        try {
            let newForm = {...form}
            let newPairs = pairs.filter(subArr => subArr.length > 0)
            let newSkip = skip.filter(subArr => subArr.length > 0)
            let allPairs = []
            let allSkip = []

            if(newForm.question_answer_pairs) {
                allPairs = JSON.parse(newForm.question_answer_pairs)
                allSkip = JSON.parse(newForm.hidden_pages)
            } 
            
            allPairs = allPairs.concat(newPairs)
            allSkip = allSkip.concat(newSkip)

            newForm.question_answer_pairs = JSON.stringify(allPairs)
            newForm.hidden_pages = JSON.stringify(allSkip)
            // newForm.question_answer_pairs = JSON.stringify(pairs)
            // newForm.hidden_pages = JSON.stringify(skip)
            let logic = {
                "question_answer_pairs": newForm.question_answer_pairs,
                "hidden_pages": newForm.hidden_pages,
            }
            
            const response = await AppService.addLogic(logic, newForm.id);
            setForm(newForm)
            console.log(response.data); 
            toggleMore(pageIndex, questionIndex)
        } catch (error) {
            console.error(error);
        }
    }

    // async function delLogic(index) {
    //     try {
    //         let newForm = {...form}

    //         let allPairs = []
    //         let allSkip = []

    //         if(newForm.question_answer_pairs) {
    //             allPairs = JSON.parse(newForm.question_answer_pairs)
    //             allSkip = JSON.parse(newForm.hidden_pages)
    //         } 
            
    //         allPairs.splice(index, 1)
    //         allSkip.splice(index, 1)

    //         newForm.question_answer_pairs = JSON.stringify(allPairs)
    //         newForm.hidden_pages = JSON.stringify(allSkip)
    //         // newForm.question_answer_pairs = JSON.stringify(pairs)
    //         // newForm.hidden_pages = JSON.stringify(skip)
            
    //         const response = await AppService.UpdateForm(newForm, newForm.id);
    //         setForm(newForm)
    //         console.log(response.data); 
            
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    async function delLogic(index) {
        try {
            let newForm = {...form}

            let allPairs = []
            let allSkip = []

            if(newForm.question_answer_pairs) {
                allPairs = JSON.parse(newForm.question_answer_pairs)
                allSkip = JSON.parse(newForm.hidden_pages)
            } 
            
            allPairs.splice(index, 1)
            allSkip.splice(index, 1)

            newForm.question_answer_pairs = JSON.stringify(allPairs)
            newForm.hidden_pages = JSON.stringify(allSkip)

            let logic = {
                "question_answer_pairs": newForm.question_answer_pairs,
                "hidden_pages": newForm.hidden_pages,
            }
            
            
            const response = await AppService.addLogic(logic, newForm.id);
            setForm(newForm)
            console.log(response.data); 
            
        } catch (error) {
            console.error(error);
        }
    }
    
      


    
  return (
    <div className='Logic'>
        <div className='Logic_made'>
            <h2 className='logic_h2'>Созданная логика</h2>
            {form && form.question_answer_pairs && form.hidden_pages && form.question_answer_pairs !== "" && form.hidden_pages !== ""
            ?
                <div className='Logic_made_true'>
                    <div className='Logic_made_left Logic_made_LR'>
                    <h3 className='logic_h2'>Если (выбраны):</h3>
                        {JSON.parse(form.question_answer_pairs).map((pair, pairIndex) => (
                            <div className='Pages_index Pages_index_l' key = {pairIndex}>
                                {/* <button type='button' onClick={() => delLogic(pairIndex)}>Удалить</button> */}
                                {pair[0].name}({pair[1].name})
                            </div>
                        ))}
                    </div>

                    <div className='Logic_made_right Logic_made_LR'>
                    <h3 className='logic_h2'>То (пропустить страницы):</h3>
                        {JSON.parse(form.hidden_pages).map((hidden, hiddenIndex) => (
                            // <div key={hiddenIndex}>{hidden.join(", ")}</div>
                            <div className='Pages_index Pages_index_r' key={hiddenIndex}>
                                {hidden.map((hPage, hPageIndex) => (
                                 <div className='Hidden_pages' key ={hPageIndex}>{`${hPage.name}`}</div>
                                ))}
                                <button style={{fontSize: "1rem", padding: ".1rem", background: "red"}} className='add_log_btn' type='button' onClick={() => delLogic(hiddenIndex)}>Удалить</button>
                            </div>

                            
                        ))}
                    </div>
                </div>
            :
                <div>Пусто</div>
            }
            
        </div>

        <div className='Logic_main'>
            {form && form.pages ? (
                form.pages.map((page, pageIndex) => (
                <div className='Logic_page' key={pageIndex}>
                    <h2 className='logic_h2'>Страница {pageIndex + 1}</h2>
                    {page.questions.map((question, questionIndex) => {
                    if (question.type === 'radio' || question.type === 'checkbox') {
                        return (
                        <div className='Logic_question_and' key={questionIndex}>
                            <div className={`Logic_question ${pageIndex === openedMoreIndex.page && questionIndex === openedMoreIndex.question ? 'active' : ''}`}>
                                <font>{question.title}</font>
                                {/* <button className='add_log_btn' type='button' onClick={() => toggleMore(pageIndex, questionIndex)}>
                                    Добавить логику
                                </button> */}
                                {pageIndex === openedMoreIndex.page && questionIndex === openedMoreIndex.question 
                                ?
                                    <button className='add_log_btn' type='button' onClick={() => toggleMore(pageIndex, questionIndex)}>
                                        Закрыть
                                    </button>
                                :
                                    <button className='add_log_btn' type='button' onClick={() => toggleMore(pageIndex, questionIndex)}>
                                        Добавить логику
                                    </button>
                                }
                            </div>
                            {pageIndex === openedMoreIndex.page && questionIndex === openedMoreIndex.question && (
                            // <div className='Logic_more'>more</div>
                            <div
                            className={`Logic_more ${
                                pageIndex === openedMoreIndex.page && questionIndex === openedMoreIndex.question
                                ? 'open'
                                : ''
                            }`}>
                                <div className='Logic_more_header'>
                                    <h3>Если респондент выбрал вариант:</h3>
                                    <h3>То пропустить страницы:</h3>
                                </div>
                               {question.choices.map((choice, choiceIndex) => (
                                    <div className='Add_logic' key={choiceIndex}>
                                        <div className='logic_if'>
                                            <input type="checkbox" name={questionIndex} onClick={(e) =>{makePair(question.id, choice.id, e.target.checked, choiceIndex, question.title, choice.name)}}/>
                                            <span>{choice.name}</span>
                                        </div>
                                        <div className='logic_then'>
                                            {form.pages.map((page2, page2Index) => {
                                                if (page2.id !== page.id) {
                                                    return (
                                                    <div className='logic_then_el'>
                                                        <input type='checkbox' name={choiceIndex} onClick={(e) =>{makeSkip(page2.id, e.target.checked, choiceIndex, (page2Index + 1))}}/>
                                                        <span>{page2Index + 1}</span>
                                                    </div>
                                                    )
                                                }
                                            }) }
                                        </div>
                                    </div>
                                ))}

                                <button className='end_logic_btn' onClick={() => saveLogic(pageIndex, questionIndex)}>Применить</button>

                            </div>
                            )}
                        </div>
                        );
                    }
                    return null;
                    })}
                </div>
                ))
            ) : (
                <div>No questions available</div>
            )}
        </div>
    </div>
  )
}

export default Logic