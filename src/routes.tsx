import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrivateRoute } from "./private"
import { Login, Message, Error, Register, Database, Edit, ChartsPage } from "./pages"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Error />} />
          <Route path='/' element={<PrivateRoute><Message /></PrivateRoute>} />
          <Route path='/charts/:chart' element={<PrivateRoute><ChartsPage /></PrivateRoute>} />
          <Route path='/database' element={<PrivateRoute><Database /></PrivateRoute>} />
          <Route path='/edit' element={<PrivateRoute><Edit /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer closeOnClick />
    </>
  )
}