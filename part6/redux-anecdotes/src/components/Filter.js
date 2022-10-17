import { useDispatch, useSelector } from 'react-redux'
import { applyFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleFilter = (event) => {
    dispatch(applyFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <label>
        Filter:
      </label>
      <input onChange={ handleFilter } />
    </div>
  )
}

export default Filter