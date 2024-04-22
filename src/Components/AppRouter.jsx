// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { allRoutes } from './Router/routes'

// import {useSelector} from 'react-redux'

// function AppRouter() {

//   const isLoggedIn = useSelector(
//     (state) => !!state.auth.authData.access
//   );
//   return (
//     <Routes>
//         {allRoutes.privateRoutes.map(route => 
//             <Route 
//             element={route.element}
//             path={route.path}
//             exact={route.exact}
//             key={route.path}
//             />
//         )}
        
//         <Route path="*" element={<Navigate to ="/home" />}/>
//     </Routes>
    
    
//   )
// }

// export default AppRouter


import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { allRoutes } from './Router/routes'

import { useSelector } from 'react-redux'

function AppRouter() {
  const isLoggedIn = useSelector(
    (state) => !!state.auth.authData.access
  );

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          {allRoutes.privateRoutes.map(route => (
            <Route 
              element={route.element}
              path={route.path}
              exact={route.exact}
              key={route.path}
            />
          ))}
        </>
      ) : (
        <>
          {allRoutes.publicRoutes.map(route => (
            <Route 
              element={route.element}
              path={route.path}
              exact={route.exact}
              key={route.path}
            />
          ))}
        </>
      )}
      <Route path="*" element={<Navigate to ="/home" />} />
    </Routes>
  )
}

export default AppRouter
