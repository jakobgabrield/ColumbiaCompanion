import React from 'react'
import "../css/Header.css"
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom';

export default function Header({ logoutUser }) {
    let history = useHistory();
    return (
        <div className="Header">
            <ul>
                <div>
                    <Link to="/" className="nav-item"><li>Home</li></Link>
                    <Link to="/profile" className="nav-item"><li>Profile</li></Link>
                    <Link to="/search" className="nav-item"><li>Search</li></Link>
                    <Link to="/recommendations" className="nav-item"><li>Recommendations</li></Link>
                </div>
                <li className="nav-item" onClick={() => {
                    logoutUser();
                    history.push("/");
                    }}>Sign Out</li>
            </ul>
        </div>
    )
}
