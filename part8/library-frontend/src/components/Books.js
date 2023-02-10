import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_BOOKS, DELETE_BOOK, ALL_AUTHORS } from '../queries'

const genres = (x) => {

}

const Books = ({ show }) => {
  const [filter, setFilter] = useState('')
  // const [delTitle, setDelTitle] = useState(null)
  const genresRef = useRef([])

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter }
  })

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [
      {query: ALL_BOOKS, variables: {genre: ''}},
      {query: ALL_AUTHORS}
    ]
  })

  const del = (delTitle) => deleteBook({ variables : {title: delTitle} })


  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  /* Using useRef hook to save genres from initial ALL_BOOKS query call
     ignore named ALL_BOOKS query calls from filter */
  if (genresRef.current.length === 0) {
    /* Extracting distinct genres from array of book objects
       map() returns two dimensional array,
       flat() converts to one dimensional array and pases it into set,
       set is deconstruct into new array without duplicates */
    genresRef.current = [...new Set(books.map(i => i.genres).flat())]
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        <span>filter: </span>
        <button onClick={() => setFilter('')}>all genres</button>
        {genresRef.current.map((genre) => (
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
