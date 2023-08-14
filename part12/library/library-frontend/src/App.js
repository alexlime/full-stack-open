import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'

import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  // const [page, setPage] = useState('recommended')
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
    setPage('books')
    client.resetStore() // resets the cache, refetches actuve queries
    /* Another way is to reset the cache without refetching, but it has a bug with component rerender,so a page reload is needed */
    // client.clearStore().then(() => {
    //   window.location.reload()
    // })
  }

  // When a new person is added, the server sends a notification to the client
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      // when the details of a new person are received, the person is added to the Apollo cache
      const addedBook = data.data.bookAdded
      alert(`BOOK ADDED:  ${addedBook.title}`)
      client.cache.updateQuery({ query: ALL_BOOKS, variables: { genre: '' }}, ({allBooks}) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token ?
          <>
           <button onClick={() => setPage('recommended')}>recommended</button>
           <button onClick={() => setPage('add')}>add book</button>
           <button onClick={logout}>logout</button>
          </>
         : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} token={token}/>

      <Books show={page === 'books'} />

      <Recommended show={page === 'recommended'} />

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
