import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorsForm = () => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')

  const [changeBirth, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
  })

  const submit = (event) => {
    event.preventDefault()
    changeBirth({ variables: { name, setBornTo } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            value={setBornTo}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )

}

export default AuthorsForm