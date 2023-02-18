import { Link, useLocation } from 'react-router-dom'

import { HeaderLogo } from './HeaderLogo'
import { HeaderSearchBar } from './HeaderSearchBar'

export const Header = () => {
  const location = useLocation()

  return (
    <header className="bg-gray-800">
      <div className="container flex gap-4 mx-auto px-4 py-2 h-16">
        <Link className="self-center" to="/">
          <HeaderLogo />
        </Link>
        {location.pathname === '/' && <HeaderSearchBar />}
      </div>
    </header>
  )
}
