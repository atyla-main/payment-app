import React, { Component } from 'react'
import queryString from 'query-string'
import { connect } from 'react-redux'
import Compute from '../components/Compute'
import { getCalculatorInfos } from '../actions/compute'
import { orderActions } from '../actions/order'
import { history } from '../helpers/history'

class Calculator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ip: '',
      tokenAmount: null,
      price: null
    }

    this.computePrice = this.computePrice.bind(this)
    this.onChangeTokenAmount = this.onChangeTokenAmount.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    const query = queryString.parse(this.props.location.search)
    const { ico, merchant } = query

    const userAgent = navigator.userAgent
    let url = `/ico-current-info/${ico}?merchant=${merchant}&userAgent=${userAgent}`
    dispatch(getCalculatorInfos(url))
  }

  handleBuy(e) {
    e.preventDefault()
    const { dataSets } = this.props
    const { dispatch } = this.props

    dispatch(orderActions.storedOrderPrice({
      amount: this.state.tokenAmount,
      value: this.state.price,
      coin: dataSets.data.attributes['coin'],
      currency: dataSets.data.attributes['current-currency']
    }))
    history.push('/payment')
  }

  computePrice(event) {
    event.preventDefault()
    const { dataSets } = this.props
    const value = dataSets.data.attributes['current-price'];

    this.setState({price: value * this.state.tokenAmount})
  }

  onChangeTokenAmount(event) {
    this.setState({ tokenAmount: event.target.value })
  }

  render() {
    const { dataSets } = this.props

    return (
      <div>
        <p>Calculator</p>
        {dataSets.length > 0 &&
          <p>{dataSets[0].data.attributes.name}</p>}
        <Compute price={this.state.price}
          onChange={this.onChangeTokenAmount}
          onSubmit={this.computePrice}/>
        {this.state.price &&
          <button onClick={this.handleBuy}>Buy tokens</button>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pending: state.ui.calculatorInfosPending,
    dataSets: state.calculatorInfos
  }
}

export default connect(mapStateToProps)(Calculator)
