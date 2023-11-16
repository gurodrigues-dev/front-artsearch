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
      <Link className="navbar_wrapper_logo" to="/">
        <img className="navbar_logo_image" src={logo} alt="Logo ArtSearch" />
        <p className="navbar_logo_text">ArtSearch</p>
      </Link>
      <div className="navbar_tools">
        <div className="wrapper_search_bar navbar_search_bar">
          <SearchBar />
          <BsSearch className="icon icon_search" />
        </div>
        <RandomArtist home={false}/>
      </div>
    </nav>
  );
};

export default Navbar;