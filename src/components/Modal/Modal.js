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
        formData.append("album_id", modalInfo.idAlbum);

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
    <div id="modal" className="wrapper_modal hide" >
      <div className="fade">
        {modalInfo && (
          <Palette src={modalInfo.imageAlbum} crossOrigin="anonymous" format="rgbString" colorCount={4}>
            {({ data, loading }) => {
              if (loading) return null

              return (
                <div className="modal">
                  <MdClose className="modal_btn_close icon" onClick={handleClick} />
                  <div className="modal_header" style={colors.gradient(data, "header")}>
                    <img className="modal_header_image" src={modalInfo.imageAlbum} alt={`Capa do album ${modalInfo.nameAlbum}`} />
                    <span className="modal_header_title">{modalInfo.nameAlbum}</span>
                  </div>
                  <div className="modal_tracks" style={colors.gradient(data)}>
                    <div className="column_title">
                          <div className="column_title_wrapper_number">
                            <span className="column_title_number">#</span>
                          </div>
                          <span className="column_title_name">Título</span>
                          <div className="column_title_wrapper_icon">
                            <BiTimeFive className="icon column_title_icon" />
                          </div>
                    </div> 
                    {
                      loadingModal ? (
                        <LoadingAnimation color={colors.selectColor(data)} />
                      ) : (
                        <div className="tracks_list">
                          {
                            tracksInfo && tracksInfo.tracks.map((track) => (
                              <div key={`${track.trackNumber}-${track.name}`} className="track">
                                <div className="track_number">
                                  <span>{track.trackNumber}</span>
                                </div>
                                <div className="track_name">
                                  <p>{track.name}</p>
                                </div>
                                <div className="track_duration">
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