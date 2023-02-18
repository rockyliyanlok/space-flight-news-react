import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ArticlePage } from './components/Article'
import { Header } from './components/Header'
import { HomePage } from './components/Home'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
