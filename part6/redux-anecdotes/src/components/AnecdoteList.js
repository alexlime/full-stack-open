import { useDispatch, useSelector } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
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
  const filterState = useSelector(state => state.filter)
  
  /* 
    If input filter is used then filter 
    the anecdote list accordingly 
  */
  let anecdotesToShow = anecdotes
  if (filterState !== '') {
    anecdotesToShow = anecdotes.filter(anecdote => (
      anecdote.content
        .toLowerCase()
        .includes(filterState.toLowerCase()) 
    ))
  } 
  
  const handleVote = (anecdote) => {
    const message = `You voted: "${anecdote.content.slice(0, 40)}..."`
    dispatch( createVote(anecdote) )
    // Notification show/hide
    dispatch( showNotification(message))
    setTimeout(() => {
      dispatch( hideNotification() )
    }, 3000)
  }

  return (
    <div>
      <Notification />
      {anecdotesToShow.map(anecdote =>
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
