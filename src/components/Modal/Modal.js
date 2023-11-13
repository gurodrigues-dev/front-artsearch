import "./Modal.css";

// Icons
import { BiTimeFive } from "react-icons/bi";
import { MdClose } from "react-icons/md";

// Hooks
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Palette } from "color-thief-react";

// Components
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

// Custom hooks
import { useAxios } from "../../hooks/useAxios";
import { useManipulationColors } from "../../hooks/useManipulationColors";

// Context
import { ModalContext } from "../../context/ModalContext";
import { LoadingContext } from "../../context/LoadingContext";


const Modal = () => {
  const axios = useAxios();
  const colors = useManipulationColors();

  const { modalInfo } = useContext(ModalContext);
  const { loadingModal, setLoadingModal } = useContext(LoadingContext);

  const [tracksInfo, setTracksInfos] = useState(null)

  useEffect(() => {
    async function fetchTracks() {
      try {
        const formData = new FormData();
        formData.append("albumId", modalInfo.idAlbum);

        const response = await axios.post("/albumTracks", formData);

        setTracksInfos(response);
        setLoadingModal(false)

      } catch (error) {
        console.log(error);
      }
    }

    if (modalInfo) {
      fetchTracks();
    }

  }, [modalInfo]);

  const handleClick = () => {
    const modal = document.querySelector("#modal");
    modal.classList.add("hide");
  }


  return (
    <div id="modal" className="hide" >
      <div className="fade">
        {modalInfo && (
          <Palette src={modalInfo.imageAlbum} crossOrigin="anonymous" format="rgbString" colorCount={4}>
            {({ data, loading }) => {
              if (loading) return null

              return (
                <div className="modal">
                  <MdClose className="close" onClick={handleClick} />
                  <div className="header" style={colors.gradient(data, "header")}>
                    <img className="image_album" src={modalInfo.imageAlbum} alt={`Capa do album ${modalInfo.nameAlbum}`} />
                    <span>{modalInfo.nameAlbum}</span>
                  </div>
                  <div className="tracks_infos" style={colors.gradient(data)}>
                    <div className="title_column">
                          <div className="wrapper_title_number">
                            <span>#</span>
                          </div>
                          <span>Título</span>
                          <div className="wrapper_icon">
                            <BiTimeFive className="icon" />
                          </div>
                    </div> 
                    {
                      loadingModal ? (
                        <LoadingAnimation color={colors.selectColor(data)} />
                      ) : (
                        <div className="track_list">
                          {
                            tracksInfo && tracksInfo.tracks.map((track) => (
                              <div key={`${track.trackNumber}-${track.name}`} className="track">
                                <div className="number">
                                  <span>{track.trackNumber}</span>
                                </div>
                                <div className="name_track">
                                  <p>{track.name}</p>
                                </div>
                                <div className="duration">
                                  <span>{track.duration}</span>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }}
          </Palette>
        )
        }
      </div>
    </div>
  )
}

export default Modal;