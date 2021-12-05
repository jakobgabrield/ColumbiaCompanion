import './App.css';
import React from "react"
import Header from './components/Header';
import LoggedIn from './components/LoggedIn';
import {
  BrowserRouter,
} from 'react-router-dom';
import AuthenticationFlow from './components/AuthenticationFlow';
import useUser from './hooks/useUser';
import AddSchoolPage from './pages/AddSchoolPage';
import ProfilePage from './pages/ProfilePage';

function App() {

  const {user, setUser, logoutUser} = useUser();

  // return <ProfilePage />

  if (!user) {
    return <AuthenticationFlow signInUser={setUser} />
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Header logoutUser={logoutUser} />
          <LoggedIn />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
