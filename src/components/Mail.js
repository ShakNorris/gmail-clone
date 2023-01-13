import React from 'react'
import './Mail.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { selectOpenMail } from '../features/MailSlice';
import { useSelector } from 'react-redux';

function Mail() {
    const navigate = useNavigate();
    const selectedMail = useSelector(selectOpenMail);

  return (
    <div className='mail'>
        <div className='mail-tools'>
            <div className='mail-toolsLeft'>
                <IconButton onClick={() => navigate('/')}>
                    <ArrowBackIcon/>
                </IconButton>
                <IconButton>
                    <MoveToInboxIcon/>
                </IconButton> 
                <IconButton>
                    <ErrorOutlineIcon/>
                </IconButton>
                <IconButton>
                    <DeleteOutlineIcon/>
                </IconButton>
                <IconButton>
                    <EmailOutlinedIcon/>
                </IconButton> 
                <IconButton>
                    <AccessTimeIcon/>
                </IconButton>
            </div>
            <div className='mail-toolsRight'>
                <IconButton>
                    <PrintOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
        <div className='mail-body'>
            <div className='mail-header'>
                <h2>{selectedMail?.subject}</h2>
                <BookmarkBorderOutlinedIcon className='mail-important'/>
                <p>{selectedMail?.title}</p>
                <p className='mail-time'>{selectedMail?.time}</p>
            </div>

            <div className='mail-message'>
                <p>{selectedMail?.description}</p>
            </div>
        </div>
    </div>
  )
}

export default Mail