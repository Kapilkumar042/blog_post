import "../register/register.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password
            });
            res.data && window.location.replace("/login")
        } catch (error) {

            setError(true);
        }

    }
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>UserName</label>
                <input type="text" className='registerInput'
                    onChange={e => setUsername(e.target.value)} placeholder='Enter your UserName...' />
                <label>Email</label>
                <input type="text" className='registerInput'
                    onChange={e => setEmail(e.target.value)} placeholder='Enter your email...' />
                <label>Password</label>
                <input type="password" className='registerInput'
                    onChange={e => setPassword(e.target.value)} placeholder='Enter your password...' />
                <button className="registerButton">register</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to='/login'>Login</Link>
            </button>
            {error && <span style={{ color: "red", marginTop: "10px" }}>SomeThing went wrong!</span>}
        </div>
    )
}
