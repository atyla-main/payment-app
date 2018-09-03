import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux';
import { userActions } from '../actions/user'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        email: '',
        password: ''
      },
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    const { user } = this.state

    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true })
    const { user } = this.state
    const { dispatch } = this.props
    if (user.email && user.password) {
      dispatch(userActions.login(user.email, user.password))
    }
  }

  render() {
    const { loggingIn, loggedIn } = this.props
    const { user, submitted } = this.state

    return (
      <div>
        { loggedIn ?
          <div>LoggedIn</div>
          :
          <LoginForm
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            loggingIn={loggingIn}
            user={user}
            submitted={submitted}/>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn, loggedIn } = state.authentication
  return {
    loggingIn,
    loggedIn
  }
}

export default connect(mapStateToProps)(Login)
