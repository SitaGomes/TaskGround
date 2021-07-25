import {Route, Redirect} from "react-router-dom"
import {ProtectedRouteType} from "./Types/index"

export function ProtectedRoute ({component: Component, isAuth, ...rest}: ProtectedRouteType) {

    return(
        <Route 
            {...rest}
            render={props => {
                if(isAuth) {
                    return <Component {...props} />
                } else {
                    return <Redirect 
                                to={{pathname: "/"}}
                            />
                }
            }
            }
        />        
    )
}

