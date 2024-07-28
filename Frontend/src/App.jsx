import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Admin from './admin/admin'
import LoginSignup from './login/login'
import Dashboard from './admin/admin'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import StudentResult from '../src/admin/studentsResults'
import HomePage from './Home/Home'
import About from './Home/About'
import DonationPage from './Home/Donate'
import Navbar from './Home/Navbar/Navbar'
import Footer from './Home/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
<<<<<<< HEAD
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<About />} />
    <Route path="/donate" element={<DonationPage />} />
    <Route path="/login" element={<LoginSignup />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
=======
      <Dashboard/>
      {/* <LoginSignup/> */}
>>>>>>> 0f2deab3b821c6e23dd363e68c493b35e4e2380f
    </>
  )
}

export default App;