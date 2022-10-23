// import { useDispatch } from 'react-redux'
import { applyFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  // const dispatch = useDispatch()

  const handleFilter = (event) => {
    // dispatch(applyFilter(event.target.value))
    props.applyFilter(event.target.value)
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

// export default Filter
export default connect(
  null, 
  { applyFilter }
)(Filter)