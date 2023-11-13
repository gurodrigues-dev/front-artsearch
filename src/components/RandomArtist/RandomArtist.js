import "./RandomArtist.css"
// Icons
import { BsShuffle } from "react-icons/bs";

// Hooks
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { useContext } from "react";

// Context
import { LoadingContext } from "../../context/LoadingContext";

const RandomArtist = ({ home }) => {
  const navigate = useNavigate();
  const axios = useAxios();
  const { setLoading } = useContext(LoadingContext);

  const handleClick = async () => {
    try {
      if(home) {
        navigate("/artistInfo");
      }

      setLoading(true);
      const response = await axios.get("/randomartist");
      navigate(`/artistInfo/${response}`);
    } catch (error) {
      console.error("Erro na solicitação GET:", error);
    };
  };

  return (
    <button className="random_artist" onClick={handleClick} >
      <BsShuffle className="icon icon_random" />
    </button>
  )
}

export default RandomArtist;