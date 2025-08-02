import { Link } from "react-router-dom";
import "../styles/Navigation.css"

export default function NavigationBar (){
    return(
        <div className="navbar">
            <Link to="/">All</Link>
            <Link to="/history">History</Link>
            <Link to="/science-fiction">Science Fiction</Link>
            <Link to="/lightnovel">Light Novel</Link>
            <Link to="/horror">Horror</Link>
            <Link to="/learning">Learning</Link>
            <Link to="/softskill">Soft Skill</Link>
        </div>
    )
}