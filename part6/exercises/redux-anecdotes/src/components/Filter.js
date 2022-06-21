import { updateFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'
const Filter = (props) => {

  const handleChange = (event) => {
    props.updateFilter(event.target.value)
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { updateFilter })(Filter)