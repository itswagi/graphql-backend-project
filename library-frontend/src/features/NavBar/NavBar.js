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
                    <AiOutlineLogin size="1.5rem" color="white" stroke-width="1" />
                </div>
                )
        } else {
            return (
                <div title="Logout">
                    <AiOutlineLogout size="1.5rem" color="white" stroke-width="1" />
                </div>
                )  
        } 
    }
    return(
        <nav>
            <div title="Home">
                <NavLink to="/">
                    <FaHome size="1.5rem" color="white" stroke-width="3" />
                </NavLink>
            </div>
            <div title="Search">
                <NavLink to="/search">
                    <FiSearch size="1.5rem" color="white" stroke-width="3" />
                </NavLink>
                
            </div>
            {renderLoginLogout()}
        </nav>
    )
}