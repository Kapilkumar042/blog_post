import "../singlePost/singlepost.css"
import { Link } from "react-router-dom";
// import SinglePostImg from "../../assets/Images/singlepost.jpg"
import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { context } from "../../context/Context";
export default function SinglePost() {
    const [post, setPosts] = useState([]);
    const location = useLocation();
    const PF = "http://localhost:5000/images/"
    const path = (location.pathname.split("/")[2]);
    const { user } = useContext(context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updatemode, setUpdateMode] = useState(false);

    // console.log(path);
    useEffect(() => {
        const fetchPosts = async () => {
            axios.get("http://localhost:5000/api/post/" + path).then((res) => {
                // console.log(res);
                setPosts(res.data);
                setTitle(res.data.title)
                setDesc(res.data.desc)
            }).catch(err => {
                console.log(err);
            })

        }
        fetchPosts();
    }, [path])
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/post/${post._id}`, { data: { username: user.username } })
            window.location.replace("/")

        } catch (error) {

        }
    }
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/post/${post._id}`, { username: user.username, title, desc });

            setUpdateMode(false)
        }
        catch (error) {

        }
    }
    return (
        <>
            <div className="singlePost">
                <div className="singlePostWrapper">
                    {post.photo && (
                        <img src={PF + post.photo} alt="" className="singlePostImg" />
                    )}
                    {updatemode ? (<input type="text" value={title}
                        className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)} />) : (


                        <h1 className="singlePostTitle">{title}
                            {
                                post.username === user?.username && (
                                    <div className="singlePostEdit">
                                        <i className=" singlePostIcon fa-regular fa-pen-to-square"
                                            onClick={() => setUpdateMode(true)}
                                        ></i>
                                        <i className=" singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                                    </div>
                                )}
                        </h1>
                    )}
                    <div className="singlePostInfo">
                        <span className='singlePostAuther'>Author:
                            <Link to={`/?user=${post.username}`} className='link'><b>{post.username}</b></Link>
                        </span>
                        <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                    </div>
                    {updatemode ? (<textarea className="singlePostDescInput" onChange={(e) => setDesc(e.target.value)} value={desc} />) : (
                        <p className='singlePostDesc'>{desc}</p>
                    )}
                    {updatemode && (
                        <button className="singlePostButton" onClick={handleUpdate}>update</button>
                    )}
                </div>
            </div>
        </>
    )
}
