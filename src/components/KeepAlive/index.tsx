import React from 'react';
import {Route} from "react-router-dom";

type Props = { component: any, path: string, alive: string, [k: string]: any }

function Index({
                   path,
                   component: Component,
                   alive,
                   ...rest
               }: Props) {

    return (
        <Route {...rest}>{
            (props) => {
                let {location} = props
                let re = new RegExp("^" + alive + "$");
                let isAlive = re.test(location.pathname)

                return <div className={isAlive ? 'show' : 'hide'}>
                    <Component {...props}  ></Component>
                </div>
            }
        }</Route>
    );
}

export default Index;