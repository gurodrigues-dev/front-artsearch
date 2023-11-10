import "./Navbar.css";

// Image
import logo from "../../assets/logo.png";

// Hooks
import { Link } from "react-router-dom";

// Components
import RandomArtist from "../RandomArtist/RandomArtist";

// Icons
import { BsSearch } from "react-icons/bs"
import SearchBar from "../SearchBar/SearchBar";


function Navbar() {
  return (
    <nav className="navbar">
      <Link className="wrapper_logo" to="/">
        <img src={logo} alt="Logo ArtSearch" />
        <p>ArtSearch</p>
      </Link>
      <div className="nav_tools">
        <div className="search_bar">
          <SearchBar />
          <BsSearch className="icon icon_search" />
        </div>
        <RandomArtist home={false}/>
      </div>
    </nav>
  );
};

export default Navbar;