import '../header/header.css'
import HeaderImg from "../../assets/Images/headerimg.jpg"
export default function Header() {
    return (
        <div className='header'>
            <div className="headerTitles">
                <span className="headerTitlesm">React & Node</span>
                <span className="headerTitlelg">Blog</span>
            </div>
            <img src={HeaderImg} alt="" className="headerImg" />
        </div>
    )
}
