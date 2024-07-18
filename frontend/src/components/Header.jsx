import { Link } from "react-router-dom";
import "./Header.css"

function Header() {
  return (
        <nav className="home-background">
        <label className="title">Pizza website</label>
            <ul className='home-list'>
                <Link className="header-style" to="/">
                    Home
                </Link>
            </ul>
        </nav> 
);}

export default Header;