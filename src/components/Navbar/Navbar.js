import "./Navbar.css";

// Image
import logo from "../../assets/logo.png";

// Hooks
import { Link } from "react-router-dom";
import { useEffect } from "react";

// Components
import RandomArtist from "../RandomArtist/RandomArtist";
import SearchBar from "../SearchBar/SearchBar";

// Icons
import { BsSearch } from "react-icons/bs"


function Navbar() {

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const search = document.querySelector(".search-bar-mobile .search__input");

    search.addEventListener("focus", () => {
      navbar.classList.add("search-open");
    });

    search.addEventListener("blur", () => {
      navbar.classList.remove("search-open");
    });
  }, []);

  return (
    <nav className="navbar">
      <Link className="wrapper-logo" to="/">
        <img className="wrapper-logo__image" src={logo} alt="Logo ArtSearch" />
        <p className="wrapper-logo__text">ArtSearch</p>
      </Link>
      <div className="wrapper-search search-bar-mobile" >
          <SearchBar />
      </div>
      <div className="navbar-tools">
        <div className="wrapper-search search-bar">
          <SearchBar />
          <BsSearch className="icon icon-search" />
        </div>
        <RandomArtist home={false}/>
      </div>
    </nav>
  );
};

export default Navbar;