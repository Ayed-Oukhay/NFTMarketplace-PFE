import "./NFTCard.css";
import User from "../User/User";
import Cardnft from "./DefCard";
import image1 from "../../assets/img/nft1.jpg";
// import image2 from "../../assets/img/nft.gif";
// import image3 from "../../assets/img/nft2.gif";
// import image4 from "../../assets/img/nft4.jpg";
// import image5 from "../../assets/img/nft3.jpg";
import imgHoverIcon from "../../assets/img/icon-view.svg";

const NFTCard = (props) => {

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // const NFTImgList = [image1, image2, image3, image4, image5];

  // const randomImg = NFTImgList[Math.floor(Math.random() * NFTImgList.length)];

  return (
    <Cardnft className="cardnft">
      <div className="img-container">
        <img src={image1} alt="cube light prism" className="card__img" />
        <div className="overlay">
          <img className="hover-icon" src={imgHoverIcon} alt="eye icon" style={{height:50, width:50}}/>
        </div>
      </div>
      <br/>
      <h2 className="card__title">RedSunset #{randomInt(999,5999)}</h2>
      {/* <p className="card__body">
        Our Equilibrium collection promotes balance and calm.
      </p> */}
      <div className="container">
        <p className="card__value">
          <svg width="11" height="18" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 10.216 5.5 18 0 10.216l5.5 3.263 5.5-3.262ZM5.5 0l5.496 9.169L5.5 12.43 0 9.17 5.5 0Z"
              fill="#00FFF8"
            />
          </svg>{" "}
          0.0{randomInt(56,99)} ETH
        </p>
        <p className="card__time">
          <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.305 2.007a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334Zm2.667 7.334H8.305a.667.667 0 0 1-.667-.667V6.007a.667.667 0 0 1 1.334 0v2h2a.667.667 0 0 1 0 1.334Z"
              fill="#8BACD9"
            />
          </svg>{" "}
          {randomInt(2,10)} days left
        </p>
      </div>
      <User />
    </Cardnft>
  );
};

export default NFTCard;