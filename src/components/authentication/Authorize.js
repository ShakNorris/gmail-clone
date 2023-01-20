import React from 'react'
import './Authentication.css'
import { Button } from '@mui/material'

function Authorize(props) {
  return (
    <div className="login-page">
      <div className="form" onSubmit={props.onSubmitLogin}>
        <div className='app-info'>
          <img src="./fire.png" />
          <p>FireMail</p>
        </div>
        <form className="login-form">
          <input name="userName" type="text" placeholder="Username" value={props.userState.userName} onChange = {props.handleInput}/>
          <input name="password" type="password" placeholder="Password"  value = {props.userState.password} onChange = {props.handleInput}/>
          <div className='auth-btns'>
            <Button onClick={props.onSubmitLogin}>login</Button>
            <Button onClick={props.signInWithGoogle}>login with google</Button>
          </div>
          <p className="message">Not registered? <a onClick={()=> props.setHasAccount(!props.hasAccount)}>Create an account</a></p>
        </form>
        </div>
        {props.errorState.length > 0 && <div>
          <h3>Error</h3>
          {props.formatError()}
        </div>}
      </div>
  )
}

export default Authorize