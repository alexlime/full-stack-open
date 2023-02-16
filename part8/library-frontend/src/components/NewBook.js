import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_GENRES } from '../queries'

const NewBook = ({ show, setPage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    // We can refetch both queries or use update callback
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    },
    update: (cache, response) => {
      // Using update callback
      cache.updateQuery({ query: ALL_BOOKS, variables: { genre: '' }}, ({allBooks}) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
    }
  })


  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    addBook({
      variables : {
      title, author, genres,
      published: parseInt(published)
      }
    })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.toLowerCase()))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
