import { applyFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleFilter = (event) => {
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

export default connect(
  null, 
  { applyFilter }
)(Filter)