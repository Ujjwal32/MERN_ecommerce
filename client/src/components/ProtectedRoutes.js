import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoutes = ({ component: Component, ...rest }) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user-e-commerce'))
  return (
    <Route {...rest} render={
      props => {
          if( loggedInUser && loggedInUser.length !==0){
            return <Component {...rest} {...props} />
          }else {
          return <Redirect to={
              {
                pathname: '/user/signin',
                state: {
                    from: props.location
                }
              }
          } />
      }
    }
    } />
  )
}

export default ProtectedRoutes;