import { useAtom } from 'jotai'

import { Header } from './components/Header'
import { Home } from './components/Home'
import { queryAtom } from './atoms'

const App = () => {
  const [query] = useAtom(queryAtom)

  return (
    <>
      <Header />
      <Home />
    </>
  )
}

export default App
