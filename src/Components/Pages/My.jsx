import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import AppService from '../API/AppService';
import { useFetching } from '../hooks/useFetching';
import axios from 'axios';


function My() {
  const [forms, setForms] = useState([])
  const [loadError, setLoadError] = useState('')
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
        setLoadError('ошибка запроса')
    }
  }

  function addForm() {
    const newForms = [...forms]
    const newForm = {
      "title": "Новый опрос",
      "description": "Описание опроса",
      "author": 1,
      "pages": [
          {
              "title": "Заголовок страницы 1",
              "questions": [
                  {
                      "title": "Вопрос 1 на странице 1",
                      "type": "checkbox",
                      "choices": [
                          {
                              "name": "Вариант ответа 1"
                          },
                          {
                              "name": "Вариант ответа 2"
                          }
                      ]
                  },
                  {
                      "title": "Вопрос 2 на странице 1",
                      "type": "checkbox",
                      "choices": [
                          {
                              "name": "Вариант ответа 1"
                          },
                          {
                              "name": "Вариант ответа 2"
                          }
                      ]
                  }
              ]
          },
          // {
          //     "title": "Заголовок страницы 2",
          //     "questions": [
          //         {
          //             "title": "Вопрос 1 на странице 2",
          //             "type": "checkbox",
          //             "choices": [
          //                 {
          //                     "name": "Вариант ответа 1"
          //                 },
          //                 {
          //                     "name": "Вариант ответа 2"
          //                 }
          //             ]
          //         },
          //         {
          //             "title": "Вопрос 2 на странице 2",
          //             "type": "checkbox",
          //             "choices": [
          //                 {
          //                     "name": "Вариант ответа 1"
          //                 },
          //                 {
          //                     "name": "Вариант ответа 2"
          //                 }
          //             ]
          //         }
          //     ]
          // }
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

  function downloadObjectAsJson(object, filename) {
    const jsonString = JSON.stringify(object);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  function ExportJson(index) {
    let newForm = forms[index]
    //console.log(newForm)
    downloadObjectAsJson(newForm, "Voting.json")
  }

  function copyForm(index) {
    const newForms = [...forms]
    const newForm = forms[index]
    newForm.is_submit = false
  
    newForms.push(newForm)
    //setForms(newForms)
    console.log(forms) 
    //postForm(JSON.stringify(newForm))
    postForm(newForm)
  }

  // const handleFileUpload = async (event) => {
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const response = await axios.post('/upload', formData);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // const handleFileUpload = async (event) => {
  //   const file = event.target.files[0];
  
  //   try {
  //     const jsonData = await file.text();
  //     const parsedData = JSON.parse(jsonData);
  //     const formData = new FormData();
  
  //     for (const [key, value] of Object.entries(parsedData)) {
  //       formData.append(key, value);
  //     }
  
  //     console.log(formData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setLoadError('')

    reader.onload = async (e) => {
      const content = e.target.result;
      try {
        const jsonData = JSON.parse(content);
        console.log(jsonData);
        if (jsonData.is_submit) {
          jsonData.is_submit = false
        }
        postForm(jsonData)
        // Здесь вы можете использовать jsonData для создания объекта и взаимодействия с ним
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        setLoadError('ошибка')
      }
    };

    reader.readAsText(file);
  };
  

  

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

              {form.is_submit
                ?
                <div>
                  <p className='element_h'>{form.title}</p>
                  <p className='smart_hide'>{form.description}</p>
                  <p>Код опроса: {form.id}</p>
                  <p>Статус: <font style={{color:"green"}}>опубликован</font></p>
                </div>
                :
                <div>
                  <p className='element_h' onClick={() => router(`/forms/${form.id}`) }>{form.title}</p>
                  <p className='smart_hide'>{form.description}</p>
                  <p>Код опроса: {form.id}</p>
                  <p>Статус: <font style={{color:"red"}}>не опубликован</font></p>
                </div>
              }
              {/* <div>
                <p className='element_h' onClick={() => router(`/forms/${form.id}`) }>{form.title}</p>
                <p className='smart_hide'>{form.description}</p>
                <p>Код опроса: {form.id}</p>
              </div> */}

              <div className='my_content_element_buttons'>
                <button className='my_content_element_del' onClick={() => delForm(form.id)}>Удалить</button>
                <button style={{background:"rgb(115,47,249)"}} className='my_content_element_del' onClick={() => router(`/ans/${form.id}`) }>Просмотр</button>
                <button style={{background:"rgb(115,47,249)"}} className='my_content_element_del' onClick={() => router(`/stat/${form.id}`) }>Статистика</button>
                <button style={{background:"rgb(115,47,249)"}} className='my_content_element_del' onClick={() => ExportJson(i) }>Экспорт</button>
                <button style={{background:"rgb(115,47,249)"}} className='my_content_element_del' onClick={() => copyForm(i) }>Копировать</button>
              </div>

              
            </div>
          )}
        </div>

        <div className='my_content_main_buttons'>
            <button type='button' className='my_content_button' onClick={() => addForm()}>Создать форму</button>
            {/* <div> */}
              {/* <button type='button' className='my_content_button' onClick={() => addForm()}>Импорт</button> */}
              <h1>Импорт формы:</h1>
              <input type="file" style={{marginBottom:"2rem"}} onChange={handleFileUpload} />
              <p style={{color:"red"}}>{loadError}</p>
            {/* </div> */}
            {/* <button type='button' className='my_content_button' onClick={() => addForm()}>Импорт</button>
            <input type="file" /> */}
            {/* <button type='buttom' className='my_content_button'>Создать голосование</button>
            <button type='buttom' className='my_content_button'>Создать тестирование</button> */}
        </div>

      </div>
      
    </div>
  )
}

export default My