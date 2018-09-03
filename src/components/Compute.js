import React, { Component } from 'react'

class Compute extends Component {
  render() {
    const { onSubmit, onChange, price } = this.props
    return (
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          <label>
            Calcul rate:
            <input type='number' onChange={(e) => onChange(e)}/>
          </label>
          <button type='submit'>Submit</button>
        </form>
        <p>{price}</p>
      </div>
    )
  }
}

export default Compute
