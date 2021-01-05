import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authLogin } from './loginSlice'

export const LoginDiv = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errStyle, setErrStyle] = useState('hidden')
    let loggedIn = useSelector( state => state.login.loggedIn)
    let err = useSelector( state => state.login.error)
    const email = useRef()
    const password = useRef()

    const handleLogin = () => {
        dispatch(authLogin([email.current.value, password.current.value]))
    }
    useEffect(() => {
        if(loggedIn === true)
            history.push('/')
        if(err){
            setErrStyle('visible')
        }
    }, [loggedIn, history, err])

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