import React from 'react'
import { Redirect, Route } from 'react-router'


const ProtectedAdmin = ({ component: Component, ...rest}) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user-e-commerce'))
    const role = loggedInUser && loggedInUser.user?.role
    return(
        <Route {...rest} render ={
            props => {
                if(role === 'admin'){
                    return <Component {...rest} {...props}/>
                } else {
                    return <Redirect to={
                        {
                          pathname: '/forbidden',
                          state: {
                              from: props.location
                          }
                        }
                    } />
                }
            }
        }/>
    )
}

export default ProtectedAdmin
