import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
    const { onSubmit, onChange, submitted, user } = this.props
    return (
      <div>
      <h2>Login</h2>
      <form name='form' onSubmit={(e) => onSubmit(e)}>
          <div>
            <label htmlFor='email'>Email:</label>
            <input type='text'
              name='email'
              value={user.email}
              onChange={(e) => onChange(e)}/>
            {submitted && !user.email &&
              <div>Email is required</div>
            }
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input type='text'
              name='password'
              value={user.password}
              onChange={(e) => onChange(e)}/>
            {submitted && !user.password &&
              <div>Password is required</div>
            }
          </div>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
