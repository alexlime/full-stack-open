import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_BOOKS, DELETE_BOOK, ALL_AUTHORS } from '../queries'

const genres = (x) => {

}

const Books = ({ show }) => {
  const [filter, setFilter] = useState('')
  const [genres, setGenres] = useState([])

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter }
  })

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [
      {query: ALL_BOOKS, variables: {genre: ''}},
      {query: ALL_AUTHORS}
    ]
  })

  useEffect(() => {
    if (result.data && filter === '') {
    /* Extracting distinct genres from array of book objects
       map() returns two dimensional array,
       flat() converts to one dimensional array and pases into set,
       set is deconstruct into new array without duplicates */
      setGenres([...new Set(result.data.allBooks.map(i => i.genres).flat())])
    }
  }, [result])

  const del = (delTitle) => deleteBook({ variables : {title: delTitle} })

  if (!show) {
    return null
  }

  if (result.loading || result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <div>
        <span>filter: </span>
        <button onClick={() => setFilter('')}>all genres</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        ))}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>
                <button onClick={() => del(a.title)}>delete book</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
