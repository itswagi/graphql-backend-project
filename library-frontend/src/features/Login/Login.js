import React from 'react'
import { useSelector } from 'react-redux'
import { gql, useMutation }  from '@apollo/client'

const login = gql`
    mutation{
        signup(email: "abcd", password: "12345", name: "test", address: "home", phone: "0900"){
            token

        }
    }
`

export const Login = () => {
    const loggedIn = useSelector( state => state.login)
    const [addTodo] = useMutation(login)
    // onClick={ () => {
    //     //addTodo().then(result => console.log(result))

    const handleLogin = () => {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
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
