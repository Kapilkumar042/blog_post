import "../settings/settings.css"
import Sidebar from "../../sidebar/Sidebar"
// import updateImg from "../../../assets/Images/singlepost.jpg"
import { useContext, useState } from "react"
import { context } from "../../../context/Context"
import axios from "axios";
export default function Settings() {
    const { user, dispatch } = useContext(context);
    const PF = "http://localhost:5000/images/"
    const [file, setfile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updateUser = {
            userId: user._id,
            username,
            email,
            password
        };
        console.log(user._id);
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updateUser.profilePic = filename;
            try {
                await axios.post("http://localhost:5000/api/upload", data)
            } catch (error) {

            }
        }
        try {
            const res = await axios.put("http://localhost:5000/api/user/" + user._id, updateUser)
            setSuccess(true)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })

        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" })

        }
    }
    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                        <label htmlFor="fileInput">
                            <i className=" settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => { setfile(e.target.files[0]) }} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} id="" onChange={e => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="text" placeholder={user.email} id="" onChange={e => setEmail(e.target.value)} />
                    <label>password</label>
                    <input type="password" id="" placeholder="***" onChange={e => setPassword(e.target.value)} />
                    <button type="submit" className="settingsUpdate">Update</button>
                    {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>profile has been updated... </span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
