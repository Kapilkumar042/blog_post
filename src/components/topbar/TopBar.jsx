import '../topbar/topbar.css'
// import Image from '../../assets/Images/profile.png'
import { Link } from 'react-router-dom'
import { context } from '../../context/Context';
import { useContext } from 'react';
export default function TopBar() {
    const { user, dispatch } = useContext(context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
    const PF = "http://localhost:5000/images/"

    return (
        <div className='top'>
            <div className="topLeft">
                <i className=" topIcon fa-brands fa-square-facebook"></i>
                <i className=" topIcon fa-brands fa-square-twitter"></i>
                <i className=" topIcon fa-brands fa-pinterest"></i>
                <i className=" topIcon fa-brands fa-instagram"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topList-item">
                        <Link className='link' to="/">HOME</Link>
                    </li>
                    <li className="topList-item">
                        <Link className='link' to="/about">ABOUT</Link>
                    </li>
                    <li className="topList-item">
                        <Link className='link' to="/contact">CONTACT</Link>

                    </li>
                    <li className="topList-item">
                        <Link className='link' to="/write">WRITE</Link>
                    </li>
                    <li className="topList-item" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to="/settings">
                        <img className='topImg' src={PF + user.profilePic} alt="" />
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topList-item">
                            <Link className='link' to="/login">LOGIN</Link>
                        </li>
                        <li className="topList-item">
                            <Link className='link' to="/register">REGISTER</Link>
                        </li>
                    </ul>
                )}
                <i className=" topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}
