import React, { Component } from 'react'
import OrderDetails from '../components/OrderDetails'
import { connect } from 'react-redux'
import { orderActions } from '../actions/order'

class Order extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toShow: 'crypto',
      errorLoading: false,
      wire: {
        accountName: 'Atyla.io, Payward Ltd',
        address: '10 rue des Saussaies, Paris 75008',
        iban: 'DE31 7002 2200 0471 7385 12',
        bankName: 'Fidor Bank AG',
        bic: 'FDDODEUUXXX'
      },
      crypto: {
        address: 'E9873D79C6D87DC0FB6A5778633389_2'
      },
      paypal: {
        infos: 'paypal payment'
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { dispatch, user, calculatorInfos, storedOrderPrice } = this.props

    if (user && calculatorInfos.data && storedOrderPrice) {
      this.setState({errorLoading: false});
      dispatch(orderActions.postOrder({
        data: {
          attributes: {
            order: calculatorInfos.data.attributes['order'],
            user: user.data.id,
            userSession: calculatorInfos.data.attributes['user-session'],
            price: storedOrderPrice.orderedPrice.amount
          }
        }
      }))
    } else {
      this.setState({errorLoading: true});
    }
  }

  handleChange(event) {
    const name = event.target.name

    this.setState({ toShow: name })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { dispatch, postOrder, calculatorInfos } = this.props
    const orderInfos = postOrder.orderPayload.data.attributes

    if (postOrder.orderPayload
        && !postOrder.orderPayload.errors
        && calculatorInfos.data) {

      dispatch(orderActions.validateOrder({
        data: {
          attributes: {
            order: calculatorInfos.data.attributes['order'],
            paymentData: this.state[`${this.state.toShow}`],
            paymentMethod: this.state.toShow
          }
        }
      }))
    }
  }

  render() {
    const { toShow } = this.state
    const { postOrder, validateOrder } = this.props


    if (validateOrder.orderValidated) {
      return (
        <div>
          <p>Your order has been validated please verify your email</p>
          <p>We will keep your informed</p>
        </div>
      )
    }

    if (postOrder.orderPayload && !postOrder.orderPayload.errors) {
      const orderInfos = postOrder.orderPayload.data.attributes

      return (
        <div>
          <OrderDetails orderInfos={orderInfos}
            toShow={toShow}
            onClick={this.handleChange} />
          <button onClick={this.handleSubmit}>Validate</button>
        </div>
      )
    }

    return (
      <div>
        {this.state.errorLoading ?
          <div>An error occur please contact our support and leave the page</div>
          :
          <div>Loading...</div>
        }
        </div>
      )
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication
  const { calculatorInfos, storedOrderPrice, postOrder, validateOrder } = state

  return {
    user,
    calculatorInfos,
    storedOrderPrice,
    postOrder,
    validateOrder
  }
}

export default connect(mapStateToProps)(Order)
