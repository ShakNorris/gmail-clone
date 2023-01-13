import React from 'react'
import "./Header.css"
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { logout, selectUser } from '../features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../config/firebase';


export default function Header() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    })
  }

  return <div className='header'>
    <div className='header-left'>
        <IconButton>
            <MenuIcon />
        </IconButton>
        <img className='icon' src="./fire.png" alt='logo'/>
        <span className='animate-text'>FireMail</span>
    </div>
    <div className='header-mid'>
        <IconButton> <SearchIcon/> </IconButton>
        <input placeholder='Search mail' type="text"/>
        <IconButton> <ArrowDropDownIcon/> </IconButton>
    </div>
    <div className='header-right'>
        <IconButton><HelpOutlineOutlinedIcon /></IconButton> 
        <IconButton><SettingsOutlinedIcon /></IconButton>
        <IconButton><AppsOutlinedIcon /></IconButton>
        <IconButton onClick={signOut}><Avatar alt={user?.displayName} src={user?.photoUrl} /></IconButton>
    </div>
  </div>
}
