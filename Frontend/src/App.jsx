import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Admin from './admin/admin'
import LoginSignup from './login/login'
import Dashboard from './admin/admin'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import StudentResult from '../src/admin/studentsResults'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<StudentResult />} />
        <Route path='/login' element={<LoginSignup />} />
      </Routes>
    </Router>
  )
}

export default App;