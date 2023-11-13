import "./ArtistInfo.css";

// Hooks
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";

// Components
import Navbar from "../../components/Navbar/Navbar"
import Card from "../../components/Card/Card"
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Modal from "../../components/Modal/Modal";

// Context
import { LoadingContext } from "../../context/LoadingContext";

const ArtistInfo = () => {
  const axios = useAxios();
  const { loading, setLoading } = useContext(LoadingContext);

  const { nameParams } = useParams();

  const [artistInfos, setArtistInfos] = useState({});

  const formData = useMemo(() => {
    const data = new FormData();
    data.append("artist", nameParams);

    return data;

  }, [nameParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post("/checkmusic", formData);

        setArtistInfos(response);
        setLoading(false);
      } catch (error) {
        console.log("Erro na solicitação POST:", error);
      };
    };

    if (nameParams) {
      fetchData();
    }
  }, [formData]);

  return (
    <div className="artist_container">
      <Modal />
      <Navbar />
      {loading ? (
        <LoadingAnimation />
      ) : (

        <div className="wrapper_infos">
          <div className="infos">
            <div className="header_infos">
              <img src={artistInfos.imageArtist} alt={`Imagem ${artistInfos.name}`} />
              <div className="title_infos">
                <h1>{artistInfos.name}</h1>
                <div className="line"></div>
                <span>
                  {artistInfos.follows}
                  <p>Seguidores</p>
                </span>
              </div>
            </div>
            <div className="songs_infos">
              <div className="top_tracks">
                <h2>Populares</h2>
                {artistInfos ? artistInfos.topTracks.map((track) => (
                  <Card key={track.name} name={track.name} image={track.image} />
                )) : null}
              </div>
              <div className="last_albuns">
                <h2>Ultimos albuns</h2>
                {artistInfos ? artistInfos.lastAlbuns.map((album) => (
                  <Card key={album.name} name={album.name} image={album.image} albumId={album.id}/>
                )) : null}
              </div>
            </div>
          </div>
          <div className="image_container">
            <img src={artistInfos.lastAlbuns[0].image} alt={`Imagem do album ${artistInfos.lastAlbuns[0].name}`} />
            <div className="color_overlay"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistInfo;