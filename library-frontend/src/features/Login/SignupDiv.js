import React, { useState, useRef } from 'react'
import { authSignUp } from './loginSlice'

export const SignupDiv = () => {
    const [showForm, setShowForm] = useState(false)
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const phone = useRef()
    const address = useRef()

    const handleSignUp = () => {

    }
    const handleClick = () => {
        setShowForm(true)
    }
    const mainSignup = (
        <>
            <h1>Sign Up!</h1>
            <button onClick={ handleClick }>Click Here!</button>
        </>
    )
    
    const signupForm = (
        <form>
            <input ref={name} type="text" id="name" placeholder="Name" required/>
            <input ref={email} type="email" id="email" placeholder="Email" required/>
            <input ref={password} type="password" id="password" placeholder="Password" required/>
            <input ref={phone} type="number" id="phone" placeholder="Phone" required /> 
            <input ref={address} type="text" id="address" placeholder="Address" required />
            <button onClick={ handleSignUp }>Submit</button>
        </form>
    ) 

    return (
        <div className="signup">
                <div>
                    { showForm ? signupForm : mainSignup }
                </div>
            </div>
        )
}