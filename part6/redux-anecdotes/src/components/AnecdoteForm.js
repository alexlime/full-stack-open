import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const handleAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(
  null, 
  { createAnecdote }
)(AnecdoteForm)



