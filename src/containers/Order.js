import React, { Component } from 'react'
import OrderDetails from '../components/OrderDetails'
import { connect } from 'react-redux'
import { orderActions } from '../actions/order'

class Order extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toShow: 'crypto'
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch, user, calculatorInfos, storedOrderPrice } = this.props

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
  }

  handleChange(event) {
    const name = event.target.name

    this.setState({ toShow: name })
  }

  render() {
    const { toShow } = this.state
    const { postOrder } = this.props

    if (postOrder.orderPayload) {
      const orderInfos = postOrder.orderPayload.data.attributes

      return (
        <div>
          <OrderDetails orderInfos={orderInfos}
            toShow={toShow}
            onClick={this.handleChange} />
        </div>
      )
    }
    return (<div>Loading...</div>)
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication
  const { calculatorInfos, storedOrderPrice, postOrder } = state

  return {
    user,
    calculatorInfos,
    storedOrderPrice,
    postOrder
  }
}

export default connect(mapStateToProps)(Order)
