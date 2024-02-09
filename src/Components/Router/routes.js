import My from "../Pages/My"
import Home from "../Pages/Home"
import FormPage from "../Pages/FormPage"

export const allRoutes = [
    {path: '/home', element: <Home/>, exact:true},
    {path: '/my', element: <My/>, exact:true},
    {path: '/form', element: <FormPage/>, exact:true},
    // {path: '/films', element: <Films/>, exact:true},
    // {path: '/films/:id', element: <FilmIdPage/>, exact:true}
]