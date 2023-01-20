import React from 'react'
import './SendMail.css'
import CloseIcon from '@mui/icons-material/Close'
import {useForm} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { selectUser } from '../features/UserSlice';
import { closeSendMessage } from '../features/MailSlice';
import fire from '../config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function SendMail() {

    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();
    let userRef = fire.database().ref("users");

    const user = useSelector(selectUser)

    const onSubmit = (formData) => {
        fire.firestore().collection('emails').add({
            sender: user.uid,
            recipient: formData.recipient,
            subject: formData.subject,
            message: formData.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(email => {
            userRef.child(user.uid).child('emails').child(email.id).set(
                {
                    recipient: formData.recipient,
                    subject: formData.subject,
                    message: formData.message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
            )
        })       
        dispatch(closeSendMessage());
    }

    return (
        <div className='sendMail'>
            <div className='sendMail-header'>
                <h3>New Message</h3>
                <CloseIcon onClick={() => dispatch(closeSendMessage())} className='sendMail-close' />
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("recipient", {required: 'Recipient is required' })} type="text" placeholder='Recipient'/>
                <input {...register("subject", {required : 'Subject is required'})}  type="text" placeholder='Subject'/>
                <textarea {...register("message", {required : 'Message is required'})}  className='sendMail-message' />
                <ErrorMessage errors={errors} name="recipient" />
                <ErrorMessage errors={errors} name="subject" />
                <ErrorMessage errors={errors} name="message" />
                
                <input value="Send Mail" type="submit" />
            </form>
            
        </div>
    )
}

export default SendMail