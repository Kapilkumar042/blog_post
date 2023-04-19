import "../sidebar/sidebar.css"
import Image from "../../assets/Images/about.jpg"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
export default function Sidebar() {
    const [cats, setCat] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            axios.get("http://localhost:5000/api/cat/").then((res) => {
                console.log(res);
                setCat(res.data);
            }).catch(err => {
                console.log(err);
            })

        }
        fetchPosts();
    }, [])
    return (
        <div className='sidebar'>
            <div className="sidebaritem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src={Image} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus cupiditate perferendis optio quidem enim iure!</p>
            </div>
            <div className="sidebaritem">
                <span className="sidebarTitle">CATEGRIES</span>
                <ul className="SidebarList">
                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className='link'>
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebaritem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className=" sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className=" sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className=" sidebarIcon fa-brands fa-pinterest"></i>
                    <i className=" sidebarIcon fa-brands fa-instagram"></i>
                </div>
            </div>
        </div>
    )
}
