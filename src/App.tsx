import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CRUD from './components/CRUD'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CRUD />} />
          <Route path="/crud" element={<CRUD />} />
        </Routes>
      </BrowserRouter>     
    </>
  )
}

export default App
