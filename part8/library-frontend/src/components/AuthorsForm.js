import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorsForm = () => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [changeBirth] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
  })

  const submit = (event) => {
    event.preventDefault()
    console.log(name)
    changeBirth({ variables: { name, setBornTo } })
    setName('')
    setBorn('')
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const options = result.data.allAuthors.map(x => ({
    value: x.name,
    label: x.name
  }))

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <Select
          options={options}
          defaultValue={name}
          onChange={( target ) => setName(target.value)}
        />
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