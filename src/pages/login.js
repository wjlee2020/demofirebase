import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import * as ROUTES from '../constants/routes';

import FirebaseContext from '../context/firebase';

// for UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.jg-corporation.com/">
          JG Corporation
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

// end ui components

export default function Login() {

    const classes = useStyles();

    const { firebase } = useContext(FirebaseContext);
    const history = useHistory();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const disabled = !emailAddress || !password;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
            history.push(ROUTES.DASHBOARD)
        } catch(e) {
            setEmailAddress('');
            setPassword('');
            setError(e.message);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <form className={classes.form} noValidate method='post' onSubmit={handleLogin}>
                    <TextField
                        type='email'
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='emailAddress'
                        label='Email Address'
                        autoComplete='emailAddress'
                        name='emailAddress'
                        value={emailAddress}
                        autoFocus
                        onChange={({target}) => setEmailAddress(target.value)}
                    />
                    <TextField
                        type='password'
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        id='password'
                        label='Password'
                        autoComplete='current-password'
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                    <Button
                        disabled={disabled}
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href={ROUTES.FORGOT_PW} variant="body2">
                                Forgot Password?
                            </Link>
                        </Grid>
                        <Grid item xs>
                            <Link href={ROUTES.SIGN_UP} variant="body2">
                                {"Need an Account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}