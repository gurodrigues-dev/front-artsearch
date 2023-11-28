import "./Modal.css";

// Icons
import { BiTimeFive } from "react-icons/bi";
import { MdClose } from "react-icons/md";

// Hooks
import { useEffect, useState, useContext } from "react";
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

  const [tracksInfo, setTracksInfos] = useState(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const formData = new FormData();
        formData.append("album_id", modalInfo.idAlbum);

        const response = await axios.post("/albumTracks", formData);

        setTracksInfos(response);
        setLoadingModal(false);

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
    <div id="modal" className="wrapper-modal hide" >
      <div className="fade">
        {modalInfo && (
          <Palette src={modalInfo.imageAlbum} crossOrigin="anonymous" format="rgbString" colorCount={4}>
            {({ data, loading }) => {
              if (loading) return null

              return (
                <div className="modal">
                  <MdClose className="modal__btn-close icon" onClick={handleClick} />
                  <div className="header-modal" style={colors.gradient(data, "header")}>
                    <img className="header-modal__image" src={modalInfo.imageAlbum} alt={`Capa do album ${modalInfo.nameAlbum}`} />
                    <span className="header-modal__title">{modalInfo.nameAlbum}</span> 
                  </div>
                  <div className="tracks" style={colors.gradient(data)}>
                    <div className="column-title">
                          <div className="wrapper-number">
                            <span className="column-title__number">#</span>
                          </div>
                          <span className="column-title__name">Título</span>
                          <div className="wrapper-icon">
                            <BiTimeFive className="icon column-title__icon" />
                          </div>
                    </div> 
                    {
                      loadingModal ? (
                        <LoadingAnimation color={colors.selectColor(data)} />
                      ) : (
                        <div className="tracks-list">
                          {
                            tracksInfo && tracksInfo.tracks.map((track) => (
                              <div key={`${track.trackNumber}-${track.name}`} className="track">
                                <div className="track__number">
                                  <span>{track.trackNumber}</span>
                                </div>
                                <div className="track__name">
                                  <p>{track.name}</p>
                                </div>
                                <div className="track__duration">
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