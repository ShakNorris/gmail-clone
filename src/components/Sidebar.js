import { Button } from '@mui/material'
import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './Sidebar.css'
import SidebarOption from './SidebarOption';
import InboxIcon from '@mui/icons-material/Inbox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { openSendMessage } from '../features/MailSlice';

function Sidebar() {

  const dispatch = useDispatch();

  return <div className='sidebar'>
    <Button onClick={() => dispatch(openSendMessage())} className='compose-btn' startIcon={<EditOutlinedIcon fontSize="large"/> }> Compose</Button>
    <SidebarOption Icon={InboxIcon} Title="Inbox" Number={(56)} selected={true} />
    <SidebarOption Icon={StarBorderIcon} Title="Starred" />
    <SidebarOption Icon={AccessTimeIcon} Title="Snoozed" />
    <SidebarOption Icon={BookmarkBorderIcon} Title="Important"/>
    <SidebarOption Icon={SendOutlinedIcon} Title="Sent"  />
    <SidebarOption Icon={DescriptionOutlinedIcon} Title="Drafts"  />
    <SidebarOption Icon={ErrorOutlineIcon} Title="Spam"  />
    <SidebarOption Icon={DeleteOutlineIcon} Title="Trash"  />

  </div>
}

export default Sidebar