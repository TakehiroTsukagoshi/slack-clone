import { Avatar } from '@material-ui/core'
import React from 'react'
import "./Header.css"
import ScheduleIcon from '@material-ui/icons/Schedule';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useStateValue } from './StateProvider';

function Header() {

  const [{ user }] = useStateValue();

  return (
    <div className="header">
      <div className="header__left">
        <Avatar src={user?.photoURL} alt={user?.displayName} />
        <ScheduleIcon />
      </div>

      <div className="header__search">
        <SearchIcon />
        <input placeholder="Search inside the App" type="text"/>
      </div>

      <div className="header__right">
        <HelpOutlineIcon />
      </div>
    </div>
  )
}

export default Header
