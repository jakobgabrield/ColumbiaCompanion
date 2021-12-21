import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import RecommendationsPage from '../pages/RecommendationsPage';
import SearchPage from '../pages/SearchPage';

export default function LoggedIn() {
    return (
        <div>
            <Switch>
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/recommendations" component={RecommendationsPage} />
                <Route path="/" component={ProfilePage} />
            </Switch>        
        </div>    
    )
}
