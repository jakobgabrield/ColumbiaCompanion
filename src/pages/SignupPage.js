import React, {useState} from 'react'
import '../css/SignupPage.css'
import Button from "react-bootstrap/Button"
import {Link} from 'react-router-dom'
import axios from 'axios'
import bcrypt from 'bcryptjs'

export default function SignupPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [minor, setMinor] = useState("");
    const [track, setTrack] = useState("");

    const registerUser = () => {
        if (name == "" || email == "" || password == "" || major == "", minor == "" | track == "") {
            alert("All fields are required.");
        } else {
            axios.post('https://amqotblo53.execute-api.us-east-1.amazonaws.com/alpha/student', {name, email, password: bcrypt.hashSync(password,10), major, minor, track});
            setEmail("");
            setPassword("");
            setName("");
            setMajor("");
            setMinor("");
            setTrack("");
        }
    }

    return (
        <div className="SignupPage">
            <input className="item" placeholder="Name" onChange={e => setName(e.target.value)} value={name} />
            <input className="item" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
            <input className="item" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
            <input className="item" placeholder="Major" onChange={e => setMajor(e.target.value)} value={major} />
            <input className="item" placeholder="Minor" onChange={e => setMinor(e.target.value)} value={minor}/>
            <input className="item" placeholder="Track" onChange={e => setTrack(e.target.value)} value={track}/>
            <Button className="item" onClick={registerUser}>Submit</Button>
            <Link className="item" to="/">Login</Link>
        </div>
    )
}
