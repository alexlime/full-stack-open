import { useState, useEffect } from 'react'
import { useMutation, useQuery, useApolloClient } from '@apollo/client'
import Select from 'react-select'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorsForm = () => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')

  const client = useApolloClient()

  const result = useQuery(ALL_AUTHORS)

  const [changeBirth] = useMutation(EDIT_AUTHOR, {
    // refetchQueries: [ { query: ALL_AUTHORS } ], // manually edit cache instead
    onError: (error) => {
      console.log('EDITING BIRTH YEAR FAILED', error.graphQLErrors[0])
    },
    update: (cache, res) => {
      // manually edit cached authors list
      // XXX BUG after store is cleared no reloading the component
      cache.updateQuery({ query: ALL_AUTHORS }, ({allAuthors}) => {
        const change = res.data.editAuthor
        const updated = allAuthors.map(x => x.name !== change.name ? x : change)
        return { allAuthors: updated }
      })
    }
  })

  const submit = (event) => {
    event.preventDefault()
    changeBirth({ variables: { name, setBornTo: parseInt(setBornTo) }})
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
            type="number"
            value={setBornTo}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button onClick={() => client.clearStore()}>clear store</button>
        <button type='submit'>update author</button>
      </form>
    </div>
  )

}

export default AuthorsForm