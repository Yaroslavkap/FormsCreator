import React, {useState, useEffect} from 'react'
//import FormEditor from '../FormEditor'
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import AppService from '../API/AppService';
import { useFetching } from '../hooks/useFetching';
import {useParams} from 'react-router-dom'

function FormPage() {

    const [form, setForm] = useState([])
    const params = useParams()

    const [page, setPage] = useState(0)

    const [fetchForm, isFormLoading, formError] = useFetching(async () => {
        const response = await AppService.getFormById(params.id);
        setForm(response.data)
        
      })
      
    
      useEffect( () => {
        fetchForm()
      }, [] )
      console.log(form)
    

    function ChangeTitle(text) {
        var newForm = {...form}
        newForm.title = text
        setForm(newForm)
        console.log(form)
    }

    function ChangeDesc(text) {
        var newForm = {...form}
        newForm.description = text
        setForm(newForm)
        console.log(form)
    }

    function ChangeQuestion(text, index, page) {
        var newForm = {...form}
        newForm.pages[page].questions[index].title = text
        setForm(newForm)
        console.log(form)
    }

    function ChangeChoice(text, i, j, page) {
        
        var newForm = {...form}
        newForm.pages[page].questions[i].choices[j].name = text
        setForm(newForm)
        console.log(form)
    }

    function removeChoice(i, j, page) {
        var newForm = {...form}
        if (newForm.pages[page].questions[i].choices.length > 1) {
            newForm.pages[page].questions[i].choices.splice(j, 1)
            setForm(newForm)
            console.log(form)
        }
    }

    function removeQuestion(i, page) {
        var newForm = {...form}
        newForm.pages[page].questions.splice(i, 1)
        setForm(newForm)
    }

    function addChoice(i, page) {
        var newForm = {...form}
        newForm.pages[page].questions[i].choices.push({name: "Вариант ответа"})
        setForm(newForm)
        console.log(form)
    }

    function addPage() {
        var newForm = {...form}
        newForm.pages.push({
            "title": "Новая страница",
            "questions": [],
        })
        setForm(newForm)
        console.log(form)
    }

    function addQuestion(type, page) {
        var newForm = {...form}
        newForm.pages[page].questions.push({
            //"id": 4,
            "title": "Новый вопрос",
            "type": type,
            "choices": [
                {
                    //"id": 8,
                    "name": "Вариант ответа 1"
                },
                {
                    //"id": 9,
                    "name": "Вариант ответа 2"
                },
                {
                    //"id": 10,
                    "name": "Вариант ответа 3"
                }
            ]
        }
        )
        setForm(newForm)
        console.log(form)
    }
// Шаблоны:
    function Yes_No(page) {
        var newForm = {...form}
        newForm.pages[page].questions.push({
            //"id": 4,
            "title": "Вы согласны ...",
            "type": "radio",
            "choices": [
                {
                    //"id": 8,
                    "name": "Да"
                },
                {
                    //"id": 9,
                    "name": "Нет"
                },
                {
                    //"id": 10,
                    "name": "Сомневаюсь ответить"
                }
            ]
        }
        )
        setForm(newForm)
        console.log(form)
    }

    function Raiting(page) {
        var newForm = {...form}
        newForm.pages[page].questions.push({
            //"id": 4,
            "title": "Оцените от 1 до 5",
            "type": "radio",
            "choices": [
                {
                    //"id": 8,
                    "name": "1"
                },
                {
                    //"id": 9,
                    "name": "2"
                },
                {
                    //"id": 10,
                    "name": "3"
                },
                {
                    //"id": 8,
                    "name": "4"
                },
                {
                    //"id": 9,
                    "name": "5"
                },
                
            ]
        }
        )
        setForm(newForm)
        console.log(form)
    }

    async function saveForm() {
        try {
            const response = await AppService.UpdateForm(form, form.id);
            console.log(response.data); 
        } catch (error) {
            console.error(error);
        }
    }

    // function addQuestion(type) {
    //     var newQuestions = [...questions]
    //     newQuestions.push(
    //         {questionText: "Название вопроса",
    //         questionType: type,
    //         options: [
    //             {optionText: "Вариант 1"},
    //             {optionText: "Вариант 2"},
    //             {optionText: "Вариант 3"},
            
    //         ],
    //         open: true,
    //         required: false
    //         }
    //     )
    //     setQuestions(newQuestions)
    // }

  return (
    // <div className='form_page'>
    //     <div className='form_page_left'>
    //         <h className='form_page_left_label'>Добавить вопрос</h>
    //         {/* <button type='button' className='form_page_left_button' onClick={() => addQuestion("radio")}>Выбор одного варианта</button>
    //         <button type='button' className='form_page_left_button' onClick={() => addQuestion("checkbox")}>Выбор нескольких</button> */}
    //         <button type='button' className='form_page_left_button'>Строка</button>
    //         <button type='button' className='form_page_left_button'>Текстовое поле</button>
    //     </div>
    //     <div className='form_page_main'>

    //         <div className='form_page_main_top'>
    //             <h className='form_page_label'>Название формы</h>
    //             <p className='form_page_label_disc'>text</p>
    //         </div>
            
            
    //         <div className='form_editor'>
    //         {form.questions.map((question, index) =>
    //                 <div className='form_editor_element'>
    //                     {/* {question.questionText} */}
    //                     <div className='form_editor_element_bin'>
    //                         <div className='form_editor_element_bin_hover'>
    //                             <IconContext.Provider  value={{ size: '1.5rem', className: "global-class-name", color:'grey' }}>
    //                                 <RiDeleteBin6Line onClick={() => removeQuestion(index)}/>
    //                             </IconContext.Provider>
    //                         </div>
                        
    //                     </div>
    //                     <input className='form_editor_element_label' type='text' value={question.title} onChange={(e) =>{ChangeQuestion(e.target.value, index)}}/>
                        
    //                     {/* {form.question.choices.map((opt, j) =>
    //                     <div >
    //                         <input type={question.questionType} name={index} />
    //                         <input className='form_editor_element_option' type='text' value={opt.optionText} onChange={(e) => {ChangeChoice(e.target.value, index, j)}}/>
    //                         <font className='form_editor_x'>
    //                             <IconContext.Provider  value={{ size: '1.2rem', className: "global-class-name", color:'grey' }}>
    //                                 <IoMdClose onClick={() => removeChoice(index, j)}/>
    //                             </IconContext.Provider>
    //                         </font>
                            
    //                     </div>
    //                     )} */}
    //                     {/* <div onClick={() => addOption(index)}>Добавить вариант ответа</div>
    //                     <button className='new_option_button' type='button' onClick={() => addOption(index)}>Добавить</button> */}
    //                 </div>
    //         )} 
            
    //         </div>
    //     </div>
       
    // </div>

    // <div className='form_page'>
    //     <div className='form_page_main'>

    //         <div className='form_page_main_top'>
    //             <h className='form_page_label'>{form.title}</h>
    //             <p className='form_page_label_disc'>{form.description}</p>
    //         </div>

    //         <div className='form_editor'>
    //             {form.questions.map((question, index) => 
    //                 <div className='form_editor_element'>
    //                 {question.title}
    //                 <div className='form_editor_element_bin'>
    //                     {/* <div className='form_editor_element_bin_hover'>
    //                         <IconContext.Provider  value={{ size: '1.5rem', className: "global-class-name", color:'grey' }}>
    //                             <RiDeleteBin6Line onClick={() => removeQuestion(index)}/>
    //                         </IconContext.Provider>
    //                     </div> */}
                    
    //                 </div>
    //                 {/* <input className='form_editor_element_label' type='text' value={question.questionText} onChange={(e) =>{ChangeQuestion(e.target.value, index)}}/> */}
                    
    //                 {/* {form.question.choices.map((opt, j) =>
    //                 <div >
    //                     <input type={question.questionType} name={index} />
    //                     <input className='form_editor_element_option' type='text' value={opt.optionText} onChange={(e) => {ChangeOption(e.target.value, index, j)}}/>
    //                     <font className='form_editor_x'>
    //                         <IconContext.Provider  value={{ size: '1.2rem', className: "global-class-name", color:'grey' }}>
    //                             <IoMdClose onClick={() => removeOption(index, j)}/>
    //                         </IconContext.Provider>
    //                     </font>
                        
    //                 </div>
    //                 )} */}
    //                 {/* <div onClick={() => addOption(index)}>Добавить вариант ответа</div>
    //                 <button className='new_option_button' type='button' onClick={() => addOption(index)}>Добавить</button> */}
    //             </div>
    //             )}
    //         </div>
    //     </div>

    // </div>
    <div>
        {isFormLoading
            ?
            <div >
                Loading
            </div>
            :
            <div className='form_page'>
        <div className='form_page_left'>
            <p className='form_page_left_label'>Сохранение:</p>
            <button style={{marginBottom:"5rem"}}  type='button' className='form_page_left_button' onClick={() => saveForm()}>Сохранить</button>



            <p className='form_page_left_label' >Добавить вопрос</p>
            <button type='button' className='form_page_left_button' onClick={() => addQuestion("radio", page)}>Выбор одного варианта</button>
            <button type='button' className='form_page_left_button' onClick={() => addQuestion("checkbox", page)}>Выбор нескольких</button>
            {/* <button type='button' className='form_page_left_button'>Строка</button>
            <button type='button' className='form_page_left_button'>Текстовое поле</button> */}

            <p style={{marginTop:"5rem"}} className='form_page_left_label' >Шаблоны</p>
            <button type='button' className='form_page_left_button' onClick={() => Yes_No(page)}>Да/Нет</button>
            <button type='button' className='form_page_left_button' onClick={() => Raiting(page)}>Рейтинг(1-5)</button>
        </div>
        <div className='form_page_main'>

            <div className='form_page_main_top'>
                <input className='form_editor_element_label' type='text' value={form.title} onChange={(e) =>{ChangeTitle(e.target.value)}}/>
                <input className='form_editor_element_option' type='text' value={form.description} onChange={(e) =>{ChangeDesc(e.target.value)}}/>

            </div>
            
            
            <div className='form_editor'>
            {/* {form && form.pages[page].questions ? ( */}
            {form && form.pages && form.pages[page] && form.pages[page].questions ? (
                        form.pages[page].questions.map((question, index) => (
                            <div className='form_editor_element'>
                                {/* {question.questionText} */}
                                <div className='form_editor_element_bin'>
                                    <div className='form_editor_element_bin_hover'>
                                        <IconContext.Provider  value={{ size: '1.5rem', className: "global-class-name", color:'grey' }}>
                                            <RiDeleteBin6Line onClick={() => removeQuestion(index, page)}/>
                                        </IconContext.Provider>
                                    </div>
                                
                                </div>
                                <input className='form_editor_element_label' type='text' value={question.title} onChange={(e) =>{ChangeQuestion(e.target.value, index, page)}}/>

                                {/* {question.choices ? (
                                    form.question.choices.map((opt, j) =>
                                    <div >
                                        <input type={question.questionType} name={index} />
                                        <input className='form_editor_element_option' type='text' value={opt.name} onChange={(e) => {ChangeChoice(e.target.value, index, j)}}/>
                                        <font className='form_editor_x'>
                                            <IconContext.Provider  value={{ size: '1.2rem', className: "global-class-name", color:'grey' }}>
                                                <IoMdClose onClick={() => removeChoice(index, j)}/>
                                            </IconContext.Provider>
                                        </font>
                                        
                                    </div>
                                    )
                                ) : (
                                    <div>No questions available</div>
                                )} */}
                                
                                {question.choices.map((opt, j) =>
                                <div >
                                    <input type={question.type} name={index} />
                                    <input className='form_editor_element_option' type='text' value={opt.name} onChange={(e) => {ChangeChoice(e.target.value, index, j, page)}}/>
                                    <font className='form_editor_x'>
                                        <IconContext.Provider  value={{ size: '1.2rem', className: "global-class-name", color:'grey' }}>
                                            <IoMdClose onClick={() => removeChoice(index, j, page)}/>
                                        </IconContext.Provider>
                                    </font>
                                    
                                </div>
                                )}
                                
                                 {/* <div onClick={() => addOption(index)}>Добавить вариант ответа</div> */}
                                <button className='new_option_button' type='button' onClick={() => addChoice(index, page)}>Добавить</button> 
                    </div>
                        ))
                    ) : (
                        <div>No questions available</div>
            )}

            <div className='pagination'>
                {/* <button type='button' onClick={() => setPage(0)}>1</button>
                <button type='button' onClick={() => setPage(1)}>2</button> */}
                {form && form.pages && form.pages.map((page, index) => (
                    <button type='button' onClick={() => setPage(index)}>{index + 1}</button>
                ))}
                <button onClick={() => addPage()}>Добавить</button>
            </div>
            
            </div>
        </div>
       
    </div>
        }
    </div>
  )
}

export default FormPage