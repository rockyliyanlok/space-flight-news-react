import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Article } from './components/Article'
import { Header } from './components/Header'
import { Home } from './components/Home'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
