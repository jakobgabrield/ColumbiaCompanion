import "../css/LoginPage.css"
import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button"
import {Link} from 'react-router-dom'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import logo from '../images/logo.png'

export default function LoginPage({ signIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signInUser = async () => {
        let res = await axios.get(`https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/student?q=${email}`);
        let hash = res.data.password.S;
        if (bcrypt.compareSync(password, hash)) {
            let user = {
                user_id: res.data.user_id.S,
                name: res.data.name.S,
                major: res.data.major.S,
                minor: res.data.minor.S,
                track: res.data.track.S,
            }
            signIn(user);
        } else {
            alert("Password and email do not match our records.");
        }
    }

    return (
        <div className="LoginPage">
            <img className="logo" src={logo} />
            <input className="item" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <input className="item" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <Button className="item"onClick={signInUser}>Submit</Button>
            <Link className="item" to="/register">Signup Now</Link>
        </div>
    )
}