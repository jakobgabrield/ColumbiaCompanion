import React from 'react'
import "../css/Header.css"
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom';
import useUser from '../hooks/useUser'
import logo from '../images/logo.png'

export default function Header({ logoutUser }) {
    let history = useHistory();
    const { user } = useUser();
    return (
        <div className="Header">
            <ul>
                <div>
                    <Link to="/profile" className="nav-item"><li>Profile</li></Link>
                    <Link to="/search" className="nav-item"><li>Search</li></Link>
                    <Link to="/recommendations" className="nav-item"><li>Recommendations</li></Link>
                </div>
                <li className="nav-item" onClick={() => {
                    logoutUser();
                    history.push("/");
                    }}>Sign Out</li>
            </ul>
            <div className="info-logo">
                <div className="info">
                    <div className="head-labels"><span className="italic">Student Name:</span> {user.name}</div>
                    <div className="head-labels"><span className="italic">Major:</span> {user.major}</div>
                    <div className="head-labels"><span className="italic">Minor:</span> {user.minor}</div>
                    <div className="head-labels"><span className="italic">Track:</span> {user.track}</div>
                </div>
                <img className="logo" src={logo} />
            </div>
        </div>
    )
}
