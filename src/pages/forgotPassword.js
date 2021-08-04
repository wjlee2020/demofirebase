import { useContext, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import * as ROUTES from '../constants/routes';

import FirebaseContext from '../context/firebase';

// for UI

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

export default function ForgotPassword() {

    const classes = useStyles();

    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [pwResetEmail, setPwResetEmail] = useState('');
    const [error, setError] = useState('');

    const disabled = !emailAddress

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try{
            await firebase.auth().sendPasswordResetEmail(emailAddress);
            setPwResetEmail('Password Reset Sent! Check your email');
            setEmailAddress('');
        } catch(e) {
            setError(e.message)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Did You Forget Your Password?
                </Typography>
                {error ? <p style={{color: 'red'}}>{error}</p> : pwResetEmail ? <p style={{color: 'blue'}}>{pwResetEmail}</p> : null}
                <form className={classes.form} noValidate method='post' onSubmit={handleResetPassword}>
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
                    <Button
                        disabled={disabled}
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        PW Reset
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href={ROUTES.LOGIN} variant="body2">
                                Back to Login
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