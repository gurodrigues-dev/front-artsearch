import "./Card.css";

import { useContext } from "react";

import { ModalContext } from "../../context/ModalContext";
import { LoadingContext } from "../../context/LoadingContext";

const Card = ({image, name, albumId = null}) => {
  const { setModalInfo } = useContext(ModalContext);
  const { setLoadingModal } = useContext(LoadingContext);

  const showModal = () => {
    setLoadingModal(true);

    const albumInfo = {
      idAlbum: albumId,
      nameAlbum: name,
      imageAlbum: image
    };

    setModalInfo(albumInfo);

    const modal = document.querySelector("#modal");
    modal.classList.remove("hide");

  }

  return (
    <div className="card" onClick={albumId ? showModal : () => {}}>
      <img className="card__image" src={image} alt={`Foto de capa da música ${name}`} />
      <p className="card__title">{name}</p>
    </div>
  );
};

export default Card;