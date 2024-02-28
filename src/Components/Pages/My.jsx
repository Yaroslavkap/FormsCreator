import React, {useState} from 'react'
import {Link} from 'react-router-dom'


function My() {

  const [forms, setForms] = useState([
    { formName: "Form1",
      disc: "disc1"
    },
    { formName: "Form2",
      disc: "disc2"
    },
    { formName: "Form3",
      disc: "disc3"
    }
  ])
  return (
    <div className='my_content'>
      <div className='my_content_header'>
        <h className='my_content_header_h'>Мои формы</h>
      </div>
      
      <div className='my_content_main'>
        <div className='my_content_main_form'>
          {forms.map((form, i) =>
            <div className='my_content_element'>
              <h className='element_h'><Link className='element_h' to='/form' >{form.formName}</Link></h>
              <p>{form.disc}</p>
            </div>
          )}
        </div>

        <div className='my_content_main_buttons'>
            <button type='buttom' className='my_content_button'>Создать форму</button>
            <button type='buttom' className='my_content_button'>Создать голосование</button>
            <button type='buttom' className='my_content_button'>Создать тестирование</button>
        </div>

      </div>
      
    </div>
  )
}

export default My