import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { FaHome } from 'react-icons/fa'
import { AiOutlineLogin, AiOutlineLogout} from 'react-icons/ai'

export const NavBar = () => {

    const userStatus = false
    const renderLoginLogout = () => {
        if( !userStatus ){
            return (
                <div title="Login">
                    <NavLink exact to="Login">
                        <AiOutlineLogin size="1.5rem" color="white" strokeWidth="1" />
                    </NavLink>
                </div>
                )
        } else {
            return (
                <div title="Logout">
                    <NavLink exact to="/">
                        <AiOutlineLogout size="1.5rem" color="white" strokeWidth="1" />
                    </NavLink>
                    
                </div>
                )  
        } 
    }
    return(
        <nav>
            <div title="Home">
                <NavLink exact to="/">
                    <FaHome size="1.5rem" color="white" strokeWidth="3" />
                </NavLink>
            </div>
            <div title="Search">
                <NavLink exact to="/search">
                    <FiSearch size="1.5rem" color="white" strokeWidth="3" />
                </NavLink>
                
            </div>
            {renderLoginLogout()}
        </nav>
    )
}