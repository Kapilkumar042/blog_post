import "../login/login.css"
import { Link } from "react-router-dom"
import { useContext, useRef } from "react"
import { context } from "../../../context/Context"
import axios from "axios"
export default function Login() {

    const userRef = useRef()
    const passwordRef = useRef()

    const { dispatch, isFatching } = useContext(context)
    const hendleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" });

        }
    }
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={hendleSubmit}>
                <label>Username</label>
                <input ref={userRef} type="text" className='loginInput' placeholder='Enter your email...' />
                <label>Password</label>
                <input ref={passwordRef} type="password" className='loginInput' placeholder='Enter your password...' />
                <button type="submit" className="loginButton" disabled={isFatching}>Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to='/register'>Register</Link>
            </button>
        </div>
    )
}
