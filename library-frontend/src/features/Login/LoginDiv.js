import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { authLogin } from './loginSlice'

export const LoginDiv = (props) => {
    const dispatch = useDispatch()
    const email = useRef()
    const password = useRef()
    const handleLogin = () => {
        dispatch(authLogin([email.current.value, password.current.value]))
    }

    return(
        <div className="login">
            <div className="upper">
                <h1>Login</h1>
            </div>
            <div className="lower">
                <form>
                    <span className={ props.errStyle }>Incorrect email or password</span>
                    <input ref={email} type="email" id="email" placeholder="Email" required/>
                    <input ref={password} type="password" id="password" placeholder="Password" required/>
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    )
}