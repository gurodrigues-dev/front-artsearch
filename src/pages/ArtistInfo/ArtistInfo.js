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
    <div className="artist">
      <Modal />
      <Navbar />
      {loading ? (
        <LoadingAnimation />
      ) : (

        <div className="artist-inner">
          <div className="infos">
            <div className="header-infos">
              <img className="header-infos__image" src={artistInfos.imageArtist} alt={`Imagem ${artistInfos.name}`} />
              <div className="header-infos-inner">
                <h1 className="header-infos__title">{artistInfos.name}</h1>
                <div className="header-infos__line"></div>
                <span className="header-infos__follows">
                  {artistInfos.follows}
                  <p>Seguidores</p>
                </span>
              </div>
            </div>
            <div className="musics">
              <div className="musics-infos">
                <h2 className="musics-infos__title">Populares</h2>
                {artistInfos.topTracks && artistInfos.topTracks.map((track) => (
                  <Card key={track.name} name={track.name} image={track.image} />
                ))}
              </div>
              <div className="musics-infos">
                <h2 className="musics-infos__title">Ultimos albuns</h2>
                {artistInfos.lastAlbuns && artistInfos.lastAlbuns.map((album) => (
                  <Card key={album.name} name={album.name} image={album.image} albumId={album.id}/>
                ))}
              </div>
            </div>
          </div>
          {artistInfos.lastAlbuns && (
            <div className="image-container">
            <img src={artistInfos.lastAlbuns[0].image} alt={`Imagem do album ${artistInfos.lastAlbuns[0].name}`} />
            <div className="color-overlay"></div>
          </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArtistInfo;