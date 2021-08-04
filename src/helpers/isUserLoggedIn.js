import { Route, Redirect } from "react-router-dom";

export default function IsUserLoggedIn({user, loggedInPath, children, ...restProps}) {
    return (
        <Route
            {...restProps}
            render={() => {
                if(!user) {
                    return children;
                }
                if(user) {
                    return (
                        <Redirect to={{pathname: loggedInPath}} />
                    )
                }
                return null;
            }}
        />
    )

}