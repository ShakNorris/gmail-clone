import React from 'react'
import { Button } from '@mui/material'
import './Authentication.css'

function Register(props) {
  return (
    <div className="login-page">
      <div className="form">
        <form className="register-form" onSubmit={props.onSubmitRegister}>
          <div className='app-info'>
            <img src="./fire.png" />
            <p>FireMail</p>
          </div>
          <input name="firstName" type="text" placeholder="First Name"  value = {props.userState.firstName}  onChange = {props.handleInput}/>
          <input name="lastName" type="text" placeholder="Last Name" value = {props.userState.lastName} onChange = {props.handleInput}/>
          <input name="userName" type="" placeholder="Username"  value = {props.userState.userName} onChange = {props.handleInput}/>
          <input name="password" type="password" placeholder="Password" value = {props.userState.password} onChange = {props.handleInput}/>
          <input name="confirmPassword" type="password" placeholder="Confirm Password" value = {props.userState.confirmPassword} onChange = {props.handleInput}/>
          <Button onClick={props.onSubmitRegister}>Register</Button>
          <p className="message">Already registered? <a onClick={()=> props.setHasAccount(!props.hasAccount)}>Sign In</a></p>
          {props.errorState.length > 0 && <div className='errors'>
          <h3>Error</h3>
          {props.formatError()}
        </div>}
        </form>
      </div>
  </div>
  )
}

export default Register