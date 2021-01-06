import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authLogin } from './loginSlice'

export const LoginDiv = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errStyle, setErrStyle] = useState('hidden')
    let loggedInStatus = useSelector( state => state.login.status)
    const email = useRef()
    const password = useRef()

    const handleLogin = () => {
        dispatch(authLogin([email.current.value, password.current.value]))
    }
    useEffect(() => {
        if(loggedInStatus === 'succeeded')
            history.push('/')
        else if(loggedInStatus === 'failed'){
            setErrStyle('visible')
        }
    }, [loggedInStatus, history])

    return(
        <div className="login">
            <div className="upper">
                <h1>Login</h1>
            </div>
            <div className="lower">
                <form>
                    <span className={ errStyle }>Incorrect email or password</span>
                    <input ref={email} type="email" id="email" placeholder="Email" required/>
                    <input ref={password} type="password" id="password" placeholder="Password" required/>
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    )
}