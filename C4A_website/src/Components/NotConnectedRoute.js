import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../auth';

export const NotConnectedRoute = ({component: Component, type: Type, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={props => {
                if(!auth.isAuthenticated()) {
                    return <Component type={Type} {...props} />
                }
                else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: { from: props.location }
                        }
                    } />
                }
            }}
        />
    )
}