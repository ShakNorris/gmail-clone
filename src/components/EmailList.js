import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';import { Checkbox, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './EmailList.css'
import RedoIcon from '@mui/icons-material/Redo';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Section from './Section';
import EmailRow from './EmailRow';
import { db, firebaseApp } from '../config/firebase';

function EmailList() {

    const [emails, setEmails] = useState([]);

    useEffect(() => {
        db.collection('emails')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
            setEmails(
                snapshot.docs.map((doc) =>({
                    id: doc.id,
                    data: doc.data()
                }))
            ))
    }, [])


  return <div className='emailList'>
    <div className='emailList-settings'>
        <div className='emailList-settingsLeft'>
            <Checkbox/>
            <IconButton>
                <ArrowDropDownOutlinedIcon/>
            </IconButton>
            <IconButton>
                <RedoIcon/>
            </IconButton> 
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
        </div>
        <div className='emailList-settingsRight'>
            <IconButton>
                <ChevronLeftIcon/>
            </IconButton>
            <IconButton>
                <ChevronRightIcon/>
            </IconButton>
        </div>
    </div>

    <div className='emailList-secitons'>
        <Section Icon={InboxIcon} title="Primary" selected={true} />
        <Section Icon={PeopleIcon} title="Social" />
        <Section Icon={LocalOfferIcon} title="Promotonions" />
    </div>

    <div className='mail-list'>
        {emails.map(({id, data: {recipient, subject, message, timestamp}}) => (
            <EmailRow 
            id={id}
            key={id}
            title =  {recipient}
            subject = {subject}
            description={message}
            time = {new Date(timestamp?.seconds * 1000).toUTCString()}
             />
        ))}
    </div>
  </div>
}

export default EmailList