import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

import Notification from './Notification'

const Anecdote = ({anecdote, handleVote}) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const handleVote = (anecdote) => {
    const message = `You voted: "${anecdote.content.slice(0, 40)}..."`
    dispatch( addVote(anecdote.id) )
    // Notification show/hide
    dispatch( showNotification(message))
    setTimeout(() => {
      dispatch( hideNotification() )
    }, 3000)
  }

  return (
    <div>
      <Notification />
      {anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote)}
        />
      )}
    </div>
  )
}



export default AnecdoteList
