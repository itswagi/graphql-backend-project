import React from 'react'
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
                <FaHome size="1.5rem" color="white" stroke-width="3" />
            </div>
            <div title="Search">
                <FiSearch size="1.5rem" color="white" stroke-width="3" />
            </div>
            {renderLoginLogout()}
        </nav>
    )
}