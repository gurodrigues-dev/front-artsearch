import "./Home.css";
// Images
import logo from "../../assets/logo.png";
// Icons
import { BsSearch } from "react-icons/bs"
// Components
import SearchBar from "../../components/SearchBar/SearchBar";
import RandomArtist from "../../components/RandomArtist/RandomArtist"

const Home = () => {
  return (
    <div className="home_container">
      <img src={logo} alt="Logo ArtSearch" />
      <div className="wrapper_search">
        <div className="search_bar">
          <BsSearch className="icon" />
          <SearchBar />
        </div>
        <RandomArtist home={true}/>
      </div>
    </div>
  )
}

export default Home