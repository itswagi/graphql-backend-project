import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { LoginDiv } from './LoginDiv'
import { SignupDiv } from './SignupDiv'

export const Login = () => {
    const history = useHistory()
    const [errStyle, setErrStyle] = useState('hidden')
    let loggedInStatus = useSelector( state => state.login.status)
    useEffect(() => {
        if(loggedInStatus === 'succeeded')
            history.push('/')
        else if(loggedInStatus === 'failed'){
            setErrStyle('visible')
        }
    }, [loggedInStatus, history])
    return (
        <div className="mainLogin">
            <LoginDiv errStyle={errStyle}/>
            <SignupDiv />
        </div>
    )
}
