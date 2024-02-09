import React, {useState} from 'react'
import FormEditor from '../FormEditor'
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconContext } from "react-icons";

function FormPage() {
    const [questions, setQuestions] = useState(
        [{questionText: "questionText1",
        questionType:"radio",
        options: [
            {optionText: "opt1"},
            {optionText: "opt2"},
            {optionText: "opt3"},
             
        ],
        open: true,
        required: false
        },
        {questionText: "questionText2",
        questionType:"checkbox",
        options: [
            {optionText: "opt21"},
            {optionText: "opt22"},
            {optionText: "opt23"},
         
        ],
        open: true,
        required: false
        },
        {questionText: "questionText2",
        questionType:"radio",
        options: [
            {optionText: "opt31"},
            {optionText: "opt32"},
            {optionText: "opt33"},
         
        ],
        open: true,
        required: false
        }
    ]
    )

    function ChangeQuestion(text, index) {
        var newQuestions = [...questions]
        newQuestions[index].questionText = text
        setQuestions(newQuestions)
        console.log(questions)
    }

    function ChangeOption(text, i, j) {
        var newQuestions = [...questions]
        newQuestions[i].options[j].optionText = text
        setQuestions(newQuestions)
        console.log(questions)
    }

    function removeOption(i, j) {
        var newQuestions = [...questions]
        if (newQuestions[i].options.length > 1) {
            newQuestions[i].options.splice(j, 1)
            setQuestions(newQuestions)
            console.log(questions)
        }
    }

    function removeQuestion(i) {
        var newQuestions = [...questions]
        newQuestions.splice(i, 1)
        setQuestions(newQuestions)
    }

    function addOption(i) {
        var newQuestions = [...questions]
        newQuestions[i].options.push({optionText: "Вариант ответа"})
        setQuestions(newQuestions)
        console.log(questions)
    }

    function addQuestion(type) {
        var newQuestions = [...questions]
        newQuestions.push(
            {questionText: "Название вопроса",
            questionType: type,
            options: [
                {optionText: "Вариант 1"},
                {optionText: "Вариант 2"},
                {optionText: "Вариант 3"},
            
            ],
            open: true,
            required: false
            }
        )
        setQuestions(newQuestions)
    }

  return (
    <div className='form_page'>
        <div className='form_page_left'>
            <h className='form_page_left_label'>Добавить вопрос</h>
            <button type='button' className='form_page_left_button' onClick={() => addQuestion("radio")}>Выбор одного варианта</button>
            <button type='button' className='form_page_left_button' onClick={() => addQuestion("checkbox")}>Выбор нескольких</button>
            <button type='button' className='form_page_left_button'>Строка</button>
            <button type='button' className='form_page_left_button'>Текстовое поле</button>
        </div>
        <div className='form_page_main'>

            <div className='form_page_main_top'>
                <h className='form_page_label'>Название формы</h>
                <p className='form_page_label_disc'>text</p>
            </div>
            
            
            <div className='form_editor'>
            {questions.map((question, index) =>
                    <div className='form_editor_element'>
                        {/* {question.questionText} */}
                        <div className='form_editor_element_bin'>
                            <div className='form_editor_element_bin_hover'>
                                <IconContext.Provider  value={{ size: '1.5rem', className: "global-class-name", color:'grey' }}>
                                    <RiDeleteBin6Line onClick={() => removeQuestion(index)}/>
                                </IconContext.Provider>
                            </div>
                        
                        </div>
                        <input className='form_editor_element_label' type='text' value={question.questionText} onChange={(e) =>{ChangeQuestion(e.target.value, index)}}/>
                        
                        {question.options.map((opt, j) =>
                        <div >
                            <input type={question.questionType} name={index} />
                            <input className='form_editor_element_option' type='text' value={opt.optionText} onChange={(e) => {ChangeOption(e.target.value, index, j)}}/>
                            <font className='form_editor_x'>
                                <IconContext.Provider  value={{ size: '1.2rem', className: "global-class-name", color:'grey' }}>
                                    <IoMdClose onClick={() => removeOption(index, j)}/>
                                </IconContext.Provider>
                            </font>
                            
                        </div>
                        )}
                        {/* <div onClick={() => addOption(index)}>Добавить вариант ответа</div> */}
                        <button className='new_option_button' type='button' onClick={() => addOption(index)}>Добавить</button>
                    </div>
            )} 
            
            </div>
        </div>
       
    </div>
  )
}

export default FormPage