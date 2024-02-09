// import React from 'react'

// function FormEditor({questions}) {
//     function ChangeQuestion(text, index) {
//         var newQuestions = [...questions]
//         newQuestions.questionText = text
//         setQ
//     }
//     console.log(questions)
//   return (
//     <div className='form_editor'>
//         {questions.map((question, index) =>
//                 <div className='form_editor_element'>
//                     {/* {question.questionText} */}
//                     <input type='text' value={question.questionText} onChange={(e) =>{ChangeQuestion(e.target.value, index)}}/>
//                     {question.options.map((opt) =>
//                     <div>{opt.optionText}</div>
//                     )}
//                 </div>
//         )} 
//     </div>
//   )
// }

// export default FormEditor