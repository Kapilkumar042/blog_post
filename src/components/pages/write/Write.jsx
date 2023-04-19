import "../write/write.css"
// import writeImg from "../../../assets/Images/singlepost.jpg"
import { useContext, useState } from "react"
import axios from "axios";
import { context } from "../../../context/Context";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setfile] = useState(null);
    const { user } = useContext(context)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("http://localhost:5000/api/upload", data)
            } catch (error) {

            }
        }
        try {
            const res = await axios.post("http://localhost:5000/api/post/", newPost)
            // window.location.replace("/" + res.data._id)/
            window.location.replace("/post/" + res.data._id)
        } catch (error) {

        }
    }
    return (
        <div className='write'>
            {
                file && (

                    <img className='writeImg' src={URL.createObjectURL(file)} alt="" />
                )
            }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className=" writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" onChange={(e) => { setfile(e.target.files[0]) }} style={{ display: "none" }} />
                    <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} id="" className='writeInput' autoFocus={true} />
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder='Tell your story...' type="text" onChange={e => setDesc(e.target.value)} className='writeInput writeText'></textarea>
                </div>
                <button className="writeSubmit" type='submit'>Publish</button>
            </form>
        </div>
    )
}
