import React, { Component } from 'react'

class OrderDetails extends Component {
  render() {
    const { onClick, toShow, orderInfos } = this.props
    return (
      <div>
        <div>Order tokens</div>
        <div>You are buying for {orderInfos.amount.value} {orderInfos.amount.currency}</div>
        <button name="crypto" onClick={(e) => onClick(e)}>Crypto</button>
        <button name="wire" onClick={(e) => onClick(e)}>Wire</button>
        <button name="paypal" onClick={(e) => onClick(e)}>PayPal</button>
        {toShow === 'crypto' &&
          <div>
            <p>Pay in crypto</p>
            <p>Atyla.io Public addresse: E9873D79C6D87DC0FB6A5778633389_2</p>
            <p>Reference: {orderInfos.payment.reference}</p>
          </div>
        }
        {toShow === 'wire' &&
          <div>
            <p>Pay using wire</p>
            <p>Account Name: Atyla.io, Payward Ltd</p>
            <p>Address: 10 rue des Saussaies, Paris 75008</p>
            <p>IBAN: DE31 7002 2200 0471 7385 12</p>
            <p>Bank Name: Fidor Bank AG</p>
            <p>BIC: FDDODEUUXXX</p>
            <p>Bank Address: Sandstrasse 33, D-80335 Munchen, Germany</p>
            <p>Reference: {orderInfos.payment.reference}</p>
            <p>Minimum: 10€</p>
          </div>
        }
        {toShow === 'paypal' &&
          <div>
            <button>Pay with Paypal</button>
          </div>
        }
      </div>
    )
  }
}

export default OrderDetails
