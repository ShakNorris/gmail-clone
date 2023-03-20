import React, { useRef, useState } from 'react'
import fire from '../../config/firebase';
import Register from './Register'
import Authorize from './Authorize';
import { useDispatch } from 'react-redux';
import {login} from '../../features/UserSlice'
import firebase from 'firebase/compat/app';

function Login() {

  const user = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    confirmPassword: ''
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  const dispatch = useDispatch()
  let userCollectionRef = fire.database().ref("users");

  let errors = [];

  let [userState, setUserState] = useState(user);
  const [errorState, setErrorState] = useState(errors);
  const [hasAccount, setHasAccount] = useState(true);


  const handleInput = (event) => {
    let target = event.target;
    setUserState((currentState) => {
        let currentuser = { ...currentState };
        currentuser[target.name] = target.value;
        return currentuser;
    })
}

  const checkForm = () =>{
    if(isFormEmpty()){
      setErrorState((error) => error.concat({message: "Please fill in all fields"}))
      return false;
    }
    if(checkPassword()){
      return false;
    }
    return true;
  }

  const isFormEmpty = () => {
    if(hasAccount){
      return !userState.firstName.length ||
      !userState.lastName.length ||
      !userState.userName.length ||
      !userState.password.length ||
      !userState.confirmPassword.length;
    }
    return !userState.userName.length ||
    !userState.password.length;
  }

  const checkPassword = () => {
    if(userState.password.length < 8){
      setErrorState((error) => error.concat({message: "Password length must be atleast 8 characters"}))
      return false;
    }
    else if (userState.password != userState.confirmPassword){
      setErrorState((error) => error.concat({message: "Password and confirm password do not match"}))
      return false;
    }
    return true;
  }

  const formatError = () =>{
    return errorState.map((error, index) => <p key={index}>{error.message}</p>)
  }

  const onSubmitLogin = (event) => {
    setErrorState(() => []);
    if(checkForm){
      fire.auth()
      .signInWithEmailAndPassword(userState.userName + '@firemail.com',userState.password)
      .then(() =>{
        dispatch(login({
          displayName: user.displayName,
          userName: user.userName,
          photoURL: user.photoURL,
          email: user.email
        }))
      })
      .catch((serverError) =>{
        setErrorState((error) => error.concat(serverError))
      })
    }
  }

  const AddGoogleUserToDB = (user) => {
     userCollectionRef.child(user.uid).set({
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL
      })
  }

  const signInWithGoogle = () => {
    fire.auth()
    .signInWithPopup(provider)
    .then(({user}) => {
      userCollectionRef.child(user.uid).on('value', (snapshot) => {
          if(snapshot.val() == null){
            AddGoogleUserToDB(user);
          }
        })
        dispatch(login({
            displayName: user.displayName,
            email: user.email,
            userName: user.userName,
            photoURL: user.photoURL
        }))
        console.log(user.uid);
    })
  }

  // function getRandomInt(max) {
  //   return Math.floor(Math.random() * max);
  // }

  const onSubmitRegister = () => {
    setErrorState(() => []);
    if(checkForm){
      fire.auth()
      .createUserWithEmailAndPassword(userState.userName  + '@firemail.com',userState.password)
      .then((user) =>{
        console.log(user.user.uid)
        userCollectionRef.child(user.user.uid).set({
          firstName : userState.firstName,
          lastName: userState.lastName,
          userName: userState.userName,
          photoURL: `https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png`,
          email: userState.userName.toLowerCase()  + '@firemail.com'.toLowerCase()
        })
        user.user.updateProfile({
          displayName: userState.userName,
          photoURL: `https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png`,
        })
        setHasAccount(true);
      })
      .catch((serverError) =>{
        setErrorState((error) => error.concat(serverError))
      })
    }
  }

  const authProps = { 
    userState, 
    errorState,
    onSubmitRegister,
    onSubmitLogin,
    signInWithGoogle,
    handleInput,
    formatError,
    hasAccount,
    setHasAccount
 };
  
  return (<>
    <div className='container'>
      <div className='top'></div>
      <div className='bottom'></div>
      <div className='center'>
      {hasAccount ? 
      <>
      <Register {...authProps} />
      </> : <>
      <Authorize {...authProps} />
      </>}
      </div>
    </div>
    </>
  )
}


export default Login