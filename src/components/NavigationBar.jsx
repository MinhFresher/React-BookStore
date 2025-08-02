import { Link } from "react-router-dom";
import "../styles/Navigation.css"

export default function NavigationBar (){
    return(
        <div className="navbar">
            <Link to="/">All</Link>
            <Link to="store/history">History</Link>
            <Link to="store/science-fiction">Science Fiction</Link>
            <Link to="store/lightnovel">Light Novel</Link>
            <Link to="store/horror">Horror</Link>
            <Link to="store/learning">Learning</Link>
            <Link to="store/softskill">Soft Skill</Link>
        </div>
    )
}