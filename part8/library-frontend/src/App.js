import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => { // keep user logged in, if token in storage
    const tokenInStorage = localStorage.getItem('library-user-token')
    if ( tokenInStorage ) setToken(tokenInStorage)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore() // resets the cache of the Apollo client
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token ?
          <>
           <button onClick={() => setPage('add')}>add book</button>
           <button onClick={logout}>logout</button>
          </>
         : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setPage={setPage} />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
