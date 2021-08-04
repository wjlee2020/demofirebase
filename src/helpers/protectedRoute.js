import { Route, Redirect } from "react-router-dom";
import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({user, children, ...restProps}) {
    return (
        <Route
            {...restProps}
            render={({location}) => {
                if(user) {
                    return children;
                }
                if(!user) {
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
                                state: { from: location }
                                }}
            />
                    )
                }
                return null;
            }}
        />
    )
}