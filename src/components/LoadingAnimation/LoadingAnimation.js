import "./LoadingAnimation.css";

const LoadingAnimation = ({ color = null }) => {
  return (
    <div className={color ? "loading loading_modal" : "loading"} >
      <span style={color ? {background: color } : {}}></span>
      <span style={color ? {background: color } : {}}></span>
      <span style={color ? {background: color } : {}}></span>
    </div>
  )
}

export default LoadingAnimation