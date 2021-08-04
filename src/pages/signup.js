import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from "../context/firebase";
import { doesUsernameExist } from "../services/firebase";


// for UI component
import { Button, Container, TextField } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


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
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

 // end UI components

export default function SignUp() {
    const classes = useStyles();

    const {firebase} = useContext(FirebaseContext);
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [acceptsPrv, setAcceptsPrv] = useState(false);

    const disabled = !username || !fullName || !emailAddress || !password || !acceptsPrv;

    const handleSignUp = async (e) => {
        e.preventDefault();

        const checkedUsername = await doesUsernameExist(username);

        if(!checkedUsername.length) {
            try{
               let createdUserInfo = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);
               await createdUserInfo.user.updateProfile({
                   displayName: username
               })
               await firebase.firestore().collection('users').add({
                   userId: createdUserInfo.user.uid,
                   username: username.toLowerCase(),
                   fullName,
                   emailAddress: emailAddress.toLowerCase(),
                   dateCreated: Date.now()
                });
                await firebase.firestore().collection('todos').add({
                    inProgress: true,
                    timestamp: Date.now(),
                    todo: "Say Hello!",
                    userId: createdUserInfo.user.uid
                })
    
                history.push(ROUTES.LOGIN);
                
            } catch(e) {
                setError(e.message);
            }
        } else {
            setUsername('');
            setFullName('');
            setEmailAddress('');
            setPassword('');
            setError(`The username: ${username} already exists.`)
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <form method='post' className={classes.form} onSubmit={handleSignUp} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='username'
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                value={username}
                                onChange={({target}) => setUsername(target.value.trim(' ').toLowerCase())}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='fullName'
                                name="fullName"
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                value={fullName}
                                onChange={({target}) => setFullName(target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='emailAddress'
                                name="emailAddress"
                                variant="outlined"
                                required
                                fullWidth
                                id="emailAddress"
                                label="Email Address"
                                value={emailAddress}
                                onChange={({target}) => setEmailAddress(target.value.toLocaleLowerCase())}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='password'
                                name="password"
                                type="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                value={password}
                                onChange={({target}) => setPassword(target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={acceptsPrv} onChange={()=> setAcceptsPrv(prev => !prev)} color="primary" />}
                                label="I Agree with Privacy Statements"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={disabled}>
                            Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                           <Link href={ROUTES.LOGIN} variant="body2">Already have an Account? Log In</Link>
                        </Grid>

                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}