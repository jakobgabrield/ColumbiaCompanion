import React from 'react'
import LoginPage from '../pages/LoginPage'
import {
    Switch,
    Route,
    BrowserRouter,
  } from 'react-router-dom';
import SignupPage from '../pages/SignupPage';

export default function AuthenticationFlow({ signInUser }) {
    return (
        <div className="AuthenticationFlow">
            <BrowserRouter>
                <Switch>
                    <Route path="/register" component={SignupPage} />
                    <Route path="/">
                        <LoginPage signIn={signInUser} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
