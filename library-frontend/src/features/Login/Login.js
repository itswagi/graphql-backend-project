import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { authLogin } from './loginSlice'
import { useHistory } from 'react-router-dom'



export const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const email = useRef()
    const password = useRef()
    const handleLogin = () => {
        dispatch(authLogin([email.current.value, password.current.value]))
        history.push('/')
    }
    return (
        <div className="login">
            <div className="upper">
                <h1>Login</h1>
            </div>
            <div className="lower">
                <input ref={email} type="email" id="email" placeholder="Email" />
                <input ref={password} type="password" id="password" placeholder="Password"/>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}
