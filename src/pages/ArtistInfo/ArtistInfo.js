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
        console.log(loading)
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

        <div className="artist_inner">
          <div className="infos">
            <div className="infos_header">
              <img className="infos_header_image" src={artistInfos.imageArtist} alt={`Imagem ${artistInfos.name}`} />
              <div className="infos_header">
                <h1 className="infos_header_title">{artistInfos.name}</h1>
                <div className="infos_header_line"></div>
                <span className="infos_header_follows">
                  {artistInfos.follows}
                  <p>Seguidores</p>
                </span>
              </div>
            </div>
            <div className="musics">
              <div className="musics_infos">
                <h2 className="musics_infos_title">Populares</h2>
                {artistInfos ? artistInfos.topTracks.map((track) => (
                  <Card key={track.name} name={track.name} image={track.image} />
                )) : null}
              </div>
              <div className="musics_infos">
                <h2 className="musics_infos_title">Ultimos albuns</h2>
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