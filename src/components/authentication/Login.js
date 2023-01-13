import React, { useRef } from 'react'
import { auth, firebaseApp, provider } from '../../config/firebase'
import './Login.css'
import { Button } from '@mui/material'
import {login} from '../../features/UserSlice'
import { useDispatch } from 'react-redux'
import { db } from '../../config/firebase'

function Login() {

    const dispatch = useDispatch()

    const usersRef = firebaseApp.database().ref("users");

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(({user}) => {
            dispatch(login({
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL
            }))
        })
    }
   
  return (
    <div className='login'>
        <div className='login-container'>
            <div className='app-info'>
                <img className='icon' src="./fire.png" alt="logo"/>
                <span>FireMail</span>
            </div>
            <Button className='login-btn' variant="contained" color="primary" onClick={signIn}>Sign In</Button>
        </div>
    </div>
  )
}

export default Login