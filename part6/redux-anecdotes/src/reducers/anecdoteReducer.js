import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      /* Find anecdote by id and increment the votes directly  
      (mutating the state with redux-toolkit feature (Immer lib)) */
      state.find(n => n.id === id).votes += 1
      /* Sorting the state in-place */
      state.sort((x,y) => y.votes - x.votes)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
