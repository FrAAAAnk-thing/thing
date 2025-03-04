import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppContextProvider from './context/AppContext'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
    const appointments = {
      '2025-02-27':['Jaking it idk'],
      '2025-02-25':['Finning it idk'],
      '2025-02-20':['am tired']
    }
  return (
    <AppContextProvider>
      <ToastContainer/>
        <div className='mx-4 sm:mx-[10%]'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:speciality' element={<Doctors />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/my-appointments' element={<MyAppointments />} />
            <Route path='/appointment/:docId' element={<Appointment />} />
          </Routes>
          <Footer />
        </div>
    </AppContextProvider>
  )
}

export const appointments = {
  '2025-2-27': ['Jaking it idk'],
  '2025-2-25': ['Finning it idk'],
};


export default App