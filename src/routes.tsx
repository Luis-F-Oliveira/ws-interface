import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Login } from './pages/public'
import 'react-toastify/dist/ReactToastify.css'
import { PrivateRoute } from './private'
import { Home } from './pages/private'
import { Commands, Sectors } from './pages/private/database'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/commands' element={
            <PrivateRoute>
              <Commands />
            </PrivateRoute>
          } />
          <Route path='/sectors' element={
            <PrivateRoute>
              <Sectors />
            </PrivateRoute>
          } />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer closeOnClick />
    </>
  )
}