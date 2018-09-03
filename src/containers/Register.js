import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm'
import { connect } from 'react-redux';
import { userActions } from '../actions/user'
import { Link } from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        country: '',
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
    if (user.firstName &&
        user.lastName &&
        user.country &&
        user.email &&
        user.password) {
          dispatch(userActions.register(user))
      }
  }

  render() {
    const { registering, registered } = this.props
    const { user, submitted } = this.state

    return (
      <div>
        { registered ?
          <div>
            <div>Registered You can now check your email</div>
            <div>You can now <Link to='/login'>Login</Link></div>
          </div>
          :
          <div>
            <RegisterForm
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              registering={registering}
              user={user}
              submitted={submitted}/>
            <p>Already registered <Link to='/login'>Login</Link></p>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { registering, registered } = state.registration
  return {
    registering,
    registered
  }
}

export default connect(mapStateToProps)(Register)
