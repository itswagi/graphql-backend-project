import React from 'react'
import { gql, useMutation }  from '@apollo/client'

const login = gql`
    mutation{
        signup(email: "abcd", password: "12345", name: "test", address: "home", phone: "0900"){
            token

        }
    }
`

export const Login = () => {
    const [addTodo] = useMutation(login)
    // onClick={ () => {
    //     //addTodo().then(result => console.log(result))
    // }}
    // let email
    // let password
    // const handleEmailChange = (event) => {
    //     email = event.target.value
    // }
    // const handlePasswordChange = (event) => {
    //     password = event.target.value
    //     console.log(password)
    // }
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
