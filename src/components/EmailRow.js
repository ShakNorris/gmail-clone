import React from 'react'
import './EmailRow.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Checkbox, IconButton } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { selectMail } from '../features/MailSlice';

function EmailRow({id, title, subject, description, time}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openMail = () => {
        dispatch(selectMail({
            id,
            title,
            subject,
            description,
            time,
        }))
        navigate('/mail')
    }

    return <div className='emailRow' onClick={(openMail)}>
        <div className='emailRow-options'>
            <Checkbox/>
            <IconButton> <StarBorderIcon /></IconButton>
            <IconButton> <BookmarkBorderIcon /></IconButton>
        </div>

        <div className='emailRow-info'>
            <div className='emailRow-main'>
                <span className='emailRow-title'>{title}</span>
                <span className='emailRow-subject'>{subject}</span>
                <span className='emailRow-description'> - {description}</span>
            </div>
            <div className='emailRow-misc'>{time}</div>
        </div>
    </div>
}

export default EmailRow