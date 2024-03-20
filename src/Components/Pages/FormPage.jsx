import React, {useState, useEffect} from 'react'
import FormEditor from '../FormEditor'
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import AppService from '../API/AppService';
import { useFetching } from '../hooks/useFetching';
import {useParams} from 'react-router-dom'

function FormPage() {

    const [form, setForm] = useState([])
    const params = useParams()

    const [fetchForm, isFormLoading, formError] = useFetching(async () => {
        const response = await AppService.getFormById(params.id);
        setForm(response.data)
        
      })
      
    
      useEffect( () => {
        fetchForm()
      }, [] )
      console.log(form)
    // const [questions, setQuestions] = useState(
    //     [{questionText: "questionText1",
    //     questionType:"radio",
    //     options: [
    //         {optionText: "opt1"},
    //         {optionText: "opt2"},
    //         {optionText: "opt3"},
             
    //     ],
    //     open: true,
    //     required: false
    //     },
    //     {questionText: "questionText2",
    //     questionType:"checkbox",
    //     options: [
    //         {optionText: "opt21"},
    //         {optionText: "opt22"},
    //         {optionText: "opt23"},
         
    //     ],
    //     open: true,
    //     required: false
    //     },
    //     {questionText: "questionText2",
    //     questionType:"radio",
    //     options: [
    //         {optionText: "opt31"},
    //         {optionText: "opt32"},
    //         {optionText: "opt33"},
         
    //     ],
    //     open: true,
    //     required: false
    //     }
    // ]
    // )

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

    function ChangeQuestion(text, index) {
        var newForm = {...form}
        newForm.questions[index].title = text
        setForm(newForm)
        console.log(form)
    }

    function ChangeChoice(text, i, j) {
        
        var newForm = {...form}
        newForm.questions[i].choices[j].name = text
        setForm(newForm)
        console.log(form)
    }

    function removeChoice(i, j) {
        var newForm = {...form}
        if (newForm.questions[i].choices.length > 1) {
            newForm.questions[i].choices.splice(j, 1)
            setForm(newForm)
            console.log(form)
        }
    }

    function removeQuestion(i) {
        var newForm = {...form}
        newForm.questions.splice(i, 1)
        setForm(newForm)
    }

    function addChoice(i) {
        var newForm = {...form}
        newForm.questions[i].choices.push({name: "Вариант ответа"})
        setForm(newForm)
        console.log(form)
    }

    function addQuestion(type = "radio") {
        var newForm = {...form}
        newForm.questions.push({
            //"id": 4,
            "title": "Новый вопрос",
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
            <h className='form_page_left_label'>Сохранение:</h>
            <button style={{marginBottom:"20%"}}  type='button' className='form_page_left_button' onClick={() => saveForm()}>Сохранить</button>



            <h className='form_page_left_label' >Добавить вопрос</h>
            <button type='button' className='form_page_left_button' onClick={() => addQuestion("radio")}>Выбор одного варианта</button>
            {/* <button type='button' className='form_page_left_button' onClick={() => addQuestion("checkbox")}>Выбор нескольких</button> */}
            <button type='button' className='form_page_left_button'>Строка</button>
            <button type='button' className='form_page_left_button'>Текстовое поле</button>
        </div>
        <div className='form_page_main'>

            <div className='form_page_main_top'>
                <input className='form_editor_element_label' type='text' value={form.title} onChange={(e) =>{ChangeTitle(e.target.value)}}/>
                <input className='form_editor_element_option' type='text' value={form.description} onChange={(e) =>{ChangeDesc(e.target.value)}}/>

            </div>
            
            
            <div className='form_editor'>
            {form && form.questions ? (
                        form.questions.map((question, index) => (
                            <div className='form_editor_element'>
                                {/* {question.questionText} */}
                                <div className='form_editor_element_bin'>
                                    <div className='form_editor_element_bin_hover'>
                                        <IconContext.Provider  value={{ size: '1.5rem', className: "global-class-name", color:'grey' }}>
                                            <RiDeleteBin6Line onClick={() => removeQuestion(index)}/>
                                        </IconContext.Provider>
                                    </div>
                                
                                </div>
                                <input className='form_editor_element_label' type='text' value={question.title} onChange={(e) =>{ChangeQuestion(e.target.value, index)}}/>

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
                                    {/* <input type={question.questionType} name={index} /> */}
                                    <input className='form_editor_element_option' type='text' value={opt.name} onChange={(e) => {ChangeChoice(e.target.value, index, j)}}/>
                                    <font className='form_editor_x'>
                                        <IconContext.Provider  value={{ size: '1.2rem', className: "global-class-name", color:'grey' }}>
                                            <IoMdClose onClick={() => removeChoice(index, j)}/>
                                        </IconContext.Provider>
                                    </font>
                                    
                                </div>
                                )}
                                
                                 {/* <div onClick={() => addOption(index)}>Добавить вариант ответа</div> */}
                                <button className='new_option_button' type='button' onClick={() => addChoice(index)}>Добавить</button> 
                    </div>
                        ))
                    ) : (
                        <div>No questions available</div>
            )}
            
            </div>
        </div>
       
    </div>
        }
    </div>
  )
}

export default FormPage