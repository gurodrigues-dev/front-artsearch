import "./Card.css";

const Card = ({image, name}) => {
  return (
    <div className="card">
      <img src={image} alt={`Foto de capa da música ${name}`} />
      <p>{name}</p>
    </div>
  );
};

export default Card;