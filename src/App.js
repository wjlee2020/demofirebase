import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import IsUserLoggedIn from './helpers/isUserLoggedIn';
import ProtectedRoute from './helpers/protectedRoute';
import * as ROUTES from './constants/routes';
import LoginContext from './context/loginContext';
import useAuthListener from './hooks/use-auth-listener';

const MainTodoList = lazy(() => import ('./pages/MainTodoList'));
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const NotFound = lazy(() => import ('./pages/not-found'));
const ForgotPassword = lazy(() => import ('./pages/forgotPassword'));


function App() {
  const { user } = useAuthListener(); 

  return (
    <LoginContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>...loading...</p>}>
          <Switch>

            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>
            
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}>
              <SignUp />
            </IsUserLoggedIn>

            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <MainTodoList />
            </ProtectedRoute>

            <Route path={ROUTES.FORGOT_PW} component={ForgotPassword} />

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </LoginContext.Provider>
  )
}

export default App;
