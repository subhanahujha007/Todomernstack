import {BrowserRouter ,Routes,Route} from"react-router-dom"
import Register from "./pages/Register.jsx"
import "./index.css"
import LoginPage from "./pages/LoginPage.jsx"
import Home from "./pages/Home.jsx"
import NotFound from "./pages/NotFound.jsx"
const App=()=>{
  return (
    <>
 <BrowserRouter>
 <Routes>
  <Route path="/register" element={<Register/>}/>
  <Route path="/login" element={<LoginPage/>}/>
  <Route path="/" element={<Home/>}/>
  <Route path="*" element={<NotFound/>}/>
 </Routes>
 </BrowserRouter>
    </>
  )
  }

export default App
