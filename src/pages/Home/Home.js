import "./Home.css";
// Images
import logo from "../../assets/logo.png";
// Icons
import { BsSearch } from "react-icons/bs";
// Components
import SearchBar from "../../components/SearchBar/SearchBar";
import RandomArtist from "../../components/RandomArtist/RandomArtist";

const Home = () => {
  return (
    <div className="home">
      <img className="home__logo" src={logo} alt="Logo ArtSearch" />
      <div className="home-search">
        <div className="wrapper-search">
          <BsSearch className="icon icon-search" />
          <SearchBar />
        </div>
        <RandomArtist home={true}/>
      </div>
    </div>
  )
}

export default Home;