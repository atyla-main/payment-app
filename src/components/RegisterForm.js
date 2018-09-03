import React, { Component } from 'react';

class RegisterForm extends Component {
  render() {
    const { onSubmit, onChange, submitted, user } = this.props
    return (
      <div>
      <h2>Register</h2>
      <form name='form' onSubmit={(e) => onSubmit(e)}>
          <div>
            <label htmlFor='firstName'>First name:</label>
            <input type='text'
              name='firstName'
              value={user.firstName}
              onChange={(e) => onChange(e)}/>
            {submitted && !user.firstName &&
              <div>First name is required</div>
            }
          </div>
          <div>
            <label htmlFor='lastName'>Last name:</label>
            <input type='text'
              name='lastName'
              value={user.lastName}
              onChange={(e) => onChange(e)}/>
            {submitted && !user.lastName &&
              <div>last name is required</div>
            }
          </div>
          <div>
            <label htmlFor='country'>Country:</label>
            <input type='text'
              name='country'
              value={user.country}
              onChange={(e) => onChange(e)}/>
            {submitted && !user.country &&
              <div>Country is required</div>
            }
          </div>
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

export default RegisterForm
