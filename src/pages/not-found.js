import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as ROUTES from '../constants/routes';

export default function NotFound() {

    return (
        <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center'> 
            <h1>Oops...404</h1>
            <h3>This Page Doesn't Seem to Exist!</h3>
            <Box marginTop="1.5em" display='flex' flexDirection='column'>
                <Button variant="contained" color="primary"><Link style={{textDecoration: 'none', color: 'white'}} to={ROUTES.LOGIN}>Login Page</Link></Button>
                <br/>
                <Button variant="contained" color="primary"><Link style={{textDecoration: 'none', color: 'white'}} to={ROUTES.SIGN_UP}>SignUp Page</Link></Button>
            </Box>
        </Box>
    )
}