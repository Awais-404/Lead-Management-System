import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './context/authContext'

import Home from './pages/Home'
import Header from './components/header'
import AddLeadForm from './pages/AddLeadForm'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const { user } = useAuthContext()

  return (
    <div className='app'>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={user ? <Home /> : <Login />} />
          <Route path='/AddLeadForm' element={user ? <AddLeadForm /> : <Login />} />
          <Route path="/login" element={!user ? <Login /> : <Home />} />
          <Route path="/signup" element={!user ? <Signup /> : <Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
