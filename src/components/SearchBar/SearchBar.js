import "./SearchBar.css"

// Hooks
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { LoadingContext } from "../../context/LoadingContext";

const SearchBar = () => {
  const navigate = useNavigate()
  const { setLoading } = useContext(LoadingContext);

  const [artistName, setArtistName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    navigate(`/artistInfo/${artistName}`);
    setArtistName("");
  }

  return (
    <form className="search_wrapper" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="search"
        type="text"
        placeholder="Digite o nome de um artista"
        onChange={(e) => setArtistName(e.target.value)}
        value={artistName}
        autoComplete="off"
      />
    </form>
  )
}

export default SearchBar;