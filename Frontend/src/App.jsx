import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Admin from './admin/admin'
import LoginSignup from './login/login'
import Dashboarda from './admin/admin'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import StudentResult from '../src/admin/studentsResults.jsx'
import HomePage from './Home/Home'
import About from './Home/About'
import DonationPage from './Home/Donate'
import Navbar from './Home/Navbar/Navbar'
import Footer from './Home/Footer/Footer'
import Profile from './Users/Pages/Profile'
import CustomCalendar from './Calendar'
import ToDoList from './ToDoList'
import AttendanceTracker from './Users/Pages/AttendanceTracker'
import Dashboard from './Dashboard'
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<About />} />
    <Route path="/donate" element={<DonationPage />} />
    <Route path="/login" element={<LoginSignup />} />
    <Route path="/admin/home" element={<Admin />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/mentorship" element={<div>1:1 Mentorship Page</div>} />
    <Route path="/login" element={<div>Login Page</div>} />
    <Route path="/calendar" element={<CustomCalendar />} />
    <Route path="/todo" element={<ToDoList />} />
    <Route path="/attendance" element={<AttendanceTracker />} />
    <Route path="/results" element={<StudentResult />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App;