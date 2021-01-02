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

    return (
        <div className="item-list" onClick={ () => {
            //addTodo().then(result => console.log(result))
        }}>
            Login
        </div>
    )
}
