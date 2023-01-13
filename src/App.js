import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import Mail from './components/Mail';
import SendMail from './components/SendMail';
import { useSelector } from 'react-redux';
import {selectSendMessageIsOpen} from './features/MailSlice'
import { selectUser } from './features/UserSlice';
import Login from './components/authentication/Login';
import { auth } from './config/firebase';
import {login} from './features/UserSlice'
import { useDispatch } from 'react-redux';

function App() {

  const sendMessageisOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(()=> {
    auth.onAuthStateChanged(user =>{
      if (user) {
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL
        }))
      }
    })
  }, [])

  return ( <>
   {!user ? (<Login />) : (<div className="App">
        <Header />

        <div className='app_body'>
          <Sidebar />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<EmailList />}/>
              <Route path="/mail" element={<Mail />}/>
            </Routes>
          </BrowserRouter>
        </div>

        {sendMessageisOpen && <SendMail />}
      </div>)}      
  </>
  );
}

export default App;
