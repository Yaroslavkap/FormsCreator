import React, {useState, useEffect} from 'react'
//import FormEditor from '../FormEditor'
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import AppService from '../API/AppService';
import { useFetching } from '../hooks/useFetching';
import { useParams} from 'react-router-dom'
import Form from '../Form/Form';
import LogicBar from '../LogicBar/LogicBar';
import Logic from '../Logic/Logic';

function FormPage() {

    const [form, setForm] = useState([])
    const params = useParams()

    

    // const [page, setPage] = useState(0)

    // const [isBtnActive, setIsBtnActive] = useState(false);


    const [fetchForm, isFormLoading, formError] = useFetching(async () => {
        const response = await AppService.getFormById(params.id);
        setForm(response.data)
        
      })

      const [logicOn, setLogicOn] = useState(false);

    const handleLogicOnChange = (value) => {
        setLogicOn(value);
        // console.log(value)
    };
      
    
      useEffect( () => {
        fetchForm()
      }, [logicOn] )
      console.log(form)

    
    

//     function ChangeTitle(text) {
//         var newForm = {...form}
//         newForm.title = text
//         setForm(newForm)
//         console.log(form)
//     }

//     function ChangeDesc(text) {
//         var newForm = {...form}
//         newForm.description = text
//         setForm(newForm)
//         console.log(form)
//     }

//     function ChangeQuestion(text, index, page) {
//         var newForm = {...form}
//         newForm.pages[page].questions[index].title = text
//         setForm(newForm)
//         console.log(form)
//     }

//     function ChangeChoice(text, i, j, page) {
        
//         var newForm = {...form}
//         newForm.pages[page].questions[i].choices[j].name = text
//         setForm(newForm)
//         console.log(form)
//     }

//     function removeChoice(i, j, page) {
//         var newForm = {...form}
//         if (newForm.pages[page].questions[i].choices.length > 1) {
//             newForm.pages[page].questions[i].choices.splice(j, 1)
//             setForm(newForm)
//             console.log(form)
//         }
//     }

//     function removeQuestion(i, page) {
//         var newForm = {...form}
//         newForm.pages[page].questions.splice(i, 1)
//         setForm(newForm)
//     }

//     function addChoice(i, page) {
//         var newForm = {...form}
//         newForm.pages[page].questions[i].choices.push({name: "Вариант ответа"})
//         setForm(newForm)
//         console.log(form)
//     }

//     function addPage() {
//         var newForm = {...form}
//         newForm.pages.push({
//             "title": "Новая страница",
//             "questions": [],
//         })
//         setForm(newForm)
//         console.log(form)
//     }

//     function addQuestion(type, page) {
//         var newForm = {...form}
//         newForm.pages[page].questions.push({
//             //"id": 4,
//             "title": "Новый вопрос",
//             "type": type,
//             "choices": [
//                 {
//                     //"id": 8,
//                     "name": "Вариант ответа 1"
//                 },
//                 {
//                     //"id": 9,
//                     "name": "Вариант ответа 2"
//                 },
//                 {
//                     //"id": 10,
//                     "name": "Вариант ответа 3"
//                 }
//             ]
//         }
//         )
//         setForm(newForm)
//         console.log(form)
//     }
// // Шаблоны:
//     function Yes_No(page) {
//         var newForm = {...form}
//         newForm.pages[page].questions.push({
//             //"id": 4,
//             "title": "Вы согласны ...",
//             "type": "radio",
//             "choices": [
//                 {
//                     //"id": 8,
//                     "name": "Да"
//                 },
//                 {
//                     //"id": 9,
//                     "name": "Нет"
//                 },
//                 {
//                     //"id": 10,
//                     "name": "Сомневаюсь ответить"
//                 }
//             ]
//         }
//         )
//         setForm(newForm)
//         console.log(form)
//     }

//     function Raiting(page) {
//         var newForm = {...form}
//         newForm.pages[page].questions.push({
//             //"id": 4,
//             "title": "Оцените от 1 до 5",
//             "type": "radio",
//             "choices": [
//                 {
//                     //"id": 8,
//                     "name": "1"
//                 },
//                 {
//                     //"id": 9,
//                     "name": "2"
//                 },
//                 {
//                     //"id": 10,
//                     "name": "3"
//                 },
//                 {
//                     //"id": 8,
//                     "name": "4"
//                 },
//                 {
//                     //"id": 9,
//                     "name": "5"
//                 },
                
//             ]
//         }
//         )
//         setForm(newForm)
//         console.log(form)
//     }

//     async function saveForm() {
//         try {
//             const response = await AppService.UpdateForm(form, form.id);
//             console.log(response.data); 

//             setIsBtnActive(true);

//             setTimeout(() => {
//             setIsBtnActive(false);
//             }, 1000);
//         } catch (error) {
//             console.error(error);
//         }
//     }

    

  return (
    
    <div>
        {isFormLoading
            ?
            <div >
                Loading
            </div>
            :
            <div className='form_page_all'>
                <LogicBar onLogicOnChange={handleLogicOnChange} logicTrue={logicOn}  />
                {logicOn
                ?
                    <Logic myForm = {form}/>
                :
                    <Form myForm = {form}/>
                }
                
            </div>
             
    //         <div className='form_page'>
    //     <div className='form_page_left'>
    //         <p className='form_page_left_label'>Сохранение:</p>
    //         <button style={{marginBottom:"5rem"}}  type='button' className={`form_page_left_button ${isBtnActive ? 'active' : ''}`} onMouseDown={() => saveForm()}>Сохранить</button>



    //         <p className='form_page_left_label' >Добавить вопрос</p>
    //         <button type='button' className='form_page_left_button' onClick={() => addQuestion("radio", page)}>Выбор одного варианта</button>
    //         <button type='button' className='form_page_left_button' onClick={() => addQuestion("checkbox", page)}>Выбор нескольких</button>
            

    //         <p style={{marginTop:"5rem"}} className='form_page_left_label' >Шаблоны</p>
    //         <button type='button' className='form_page_left_button' onClick={() => Yes_No(page)}>Да/Нет</button>
    //         <button type='button' className='form_page_left_button' onClick={() => Raiting(page)}>Рейтинг(1-5)</button>
    //     </div>
    //     <div className='form_page_main'>

    //         <div className='form_page_main_top'>
    //             <input className='form_editor_element_label' type='text' value={form.title} onChange={(e) =>{ChangeTitle(e.target.value)}}/>
    //             <input className='form_editor_element_option' type='text' value={form.description} onChange={(e) =>{ChangeDesc(e.target.value)}}/>

    //         </div>
            
            
    //         <div className='form_editor'>
    //             {form && form.pages && form.pages[page] && form.pages[page].questions ? (
    //             <div>
    //                 <div className='form_editor_element'>
    //                     <p>Страница {page + 1}</p>
    //                 </div>
    //                 {form.pages[page].questions.map((question, index) => (
    //                 <div className="form_editor_element">
    //                     <div className="form_editor_element_bin">
    //                     <div className="form_editor_element_bin_hover">
    //                         <IconContext.Provider value={{ size: "1.5rem", className: "global-class-name", color: "grey" }}>
    //                         <RiDeleteBin6Line onClick={() => removeQuestion(index, page)} />
    //                         </IconContext.Provider>
    //                     </div>
    //                     </div>
    //                     <input className="form_editor_element_label" type="text" value={question.title} onChange={(e) => { ChangeQuestion(e.target.value, index, page) }} />
    //                     {question.choices.map((opt, j) => (
    //                     <div>
    //                         <input type={question.type} name={index} />
    //                         <input className="form_editor_element_option" type="text" value={opt.name} onChange={(e) => { ChangeChoice(e.target.value, index, j, page) }} />
    //                         <font className="form_editor_x">
    //                         <IconContext.Provider value={{ size: "1.2rem", className: "global-class-name", color: "grey" }}>
    //                             <IoMdClose onClick={() => removeChoice(index, j, page)} />
    //                         </IconContext.Provider>
    //                         </font>
    //                     </div>
    //                     ))}
    //                     <button className="new_option_button" type="button" onClick={() => addChoice(index, page)}>Добавить</button>
    //                 </div>
    //                 ))}
    //             </div>
    //             ) : (
    //             <div>No questions available</div>
    //             )}


    //         <div className='pagination'>
                
    //             {form && form.pages && form.pages.map((page, index) => (
    //                 <button type='button' onClick={() => setPage(index)}>{index + 1}</button>
    //             ))}
    //             <button onClick={() => addPage()}>Добавить</button>
    //         </div>
            
    //         </div>
    //     </div>
       
    // </div>
        }
    </div>
  )
}

export default FormPage