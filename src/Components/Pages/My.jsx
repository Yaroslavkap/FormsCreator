import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import AppService from '../API/AppService';
import { useFetching } from '../hooks/useFetching';


function My() {
  const [forms, setForms] = useState([])
  const router = useNavigate()
  const params = useParams()
  // const [forms, setForms] = useState([
  //   { formName: "Form1",
  //     disc: "disc1"
  //   },
  //   { formName: "Form2",
  //     disc: "disc2"
  //   },
  //   { formName: "Form3",
  //     disc: "disc3"
  //   }
  // ])
  const [fetchForms, isFormsLoading, formError] = useFetching(async () => {
    const response = await AppService.getMyForms(params.id);
    setForms(response.data)
    
  })
  

  useEffect( () => {
    fetchForms()
  }, [params.id] )
  console.log(forms)

  async function postForm(form) {
    try {
        const response = await AppService.PostForm(form);
        console.log(response.data); // Вывод ответа от сервера после успешной отправки формы
        fetchForms()
    } catch (error) {
        console.error(error); // Обработка ошибки, если запрос не удался
    }
  }

  function addForm() {
    const newForms = [...forms]
    const newForm = {
        "id": 1,
        "title": "Новое голосование",
        "description": "Описание нового голосования",
        "author": 1,
        "questions": [
            {
                "id": 1,
                "title": "Вопрос 1",
                "type": "checkbox",
                "choices": [
                    {
                        "id": 1,
                        "name": "Вариант ответа 1"
                    },
                    {
                        "id": 2,
                        "name": "Вариант ответа 2"
                    }
                ]
            },
            {
                "id": 2,
                "title": "Вопрос 2",
                "type": "radio",
                "choices": [
                    {
                        "id": 3,
                        "name": "Вариант ответа 1"
                    },
                    {
                        "id": 4,
                        "name": "Вариант ответа 2"
                    },
                    {
                        "id": 5,
                        "name": "Вариант ответа 3"
                    }
                ]
            }
        ]
    }
    newForms.push(newForm)
    //setForms(newForms)
    console.log(forms) 
    //postForm(JSON.stringify(newForm))
    postForm(newForm)
  }

  async function delForm(id) {
    try {
      const response = await AppService.delFormById(id);
      console.log(response.data); 
      fetchForms()
  } catch (error) {
      console.error(error);
  }
  }

  

  return (
    <div className='my_content'>
      <div className='my_content_header'>
        <p className='my_content_header_h'>Мои формы</p>
      </div>
      
      <div className='my_content_main'>
        <div className='my_content_main_form'>
          {forms.map((form, i) =>
            <div className='my_content_element'>
              {/* <h className='element_h'><Link className='element_h' to="/form" >{form.title}</Link></h> */}
              <div>
                <p className='element_h' onClick={() => router(`/forms/${form.id}`) }>{form.title}</p>
                {/* <p>{form.description}</p> */}
              </div>

              <div className='my_content_element_buttons'>
                <button className='my_content_element_del' onClick={() => delForm(form.id)}>Удалить</button>
                <button style={{background:"rgb(115,47,249)"}} className='my_content_element_del' onClick={() => router(`/ans/${form.id}`) }>Перейти</button>
              </div>

              
            </div>
          )}
        </div>

        <div className='my_content_main_buttons'>
            <button type='button' className='my_content_button' onClick={() => addForm()}>Создать форму</button>
            {/* <button type='buttom' className='my_content_button'>Создать голосование</button>
            <button type='buttom' className='my_content_button'>Создать тестирование</button> */}
        </div>

      </div>
      
    </div>
  )
}

export default My