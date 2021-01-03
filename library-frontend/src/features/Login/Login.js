import React from 'react'
import { useDispatch } from 'react-redux'
import {  authLogin } from './loginSlice'



export const Login = () => {
    //const loggedIn = useSelector( state => state.login )
    const dispatch = useDispatch()

    const handleLogin = () => {
        const email = String(document.getElementById('email').value)
        const password = String(document.getElementById('password').value)
        
        dispatch(authLogin([email, password]))
    }
    return (
        <div className="login">
            <div className="upper">
                <h1>Login</h1>
            </div>
            <div className="lower">
                <input type="email" id="email" placeholder="Email" />
                <input type="password" id="password" placeholder="Password"/>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}
