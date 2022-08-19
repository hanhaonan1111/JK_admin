import {hasToken} from '@/utils/token'
import {Redirect, Route, RouteProps} from 'react-router-dom'
import React from "react";

interface Props extends RouteProps {
    component: React.ComponentType<any>;
}

function Index({component: Component, ...rest}: Props) {
    return (
        <Route
            {...rest}
            render={
                (props) => {
                    if (hasToken()) {
                        return <Component  {...props}/>
                    }
                    return <Redirect
                        to={{pathname: "/login", state: {from: props.location.pathname}}}
                    ></Redirect>


                }
            }
        ></Route>
    );
}

export default Index;