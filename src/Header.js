import "./styles/Header.css";
import twitter from "./social/twitter.svg";
import insta from "./social/insta.svg";
import discord from "./social/discord.svg";
import opensea from "./social/opensea.svg";
import home from "./social/homelogo.png";
import ButtonExt from "./ButtonExt";

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header-home">
        <div className="header--logo">
         
                  <a className="button" href="https://ghostlers.io" target="_blank" rel="noreferrer">
                      
                      <img className="button--img1" src={home} alt={"Home"} />
                  </a>
        </div>
        <div className="header--nav">
          <div className="header--nav-items">
            <ButtonExt
                          location="https://twitter.com/ghostlersNFT"
              image={twitter}
              alt={"Twitter"}
            />
          </div>
          <div className="header--nav-items">
            <ButtonExt
                          location="https://discord.gg/J6z2psTrVS"
              image={discord}
              alt={"Discord"}
            />
          </div>
          <div className="header--nav-items">
            <ButtonExt
                          location="https://www.instagram.com/ghostlersnft/"
              image={insta}
              alt={"Instagram"}
            />
          </div>
          <div className="header--nav-items">
            <ButtonExt
                          location="https://opensea.io/collection/boredapeyachtclub"
              image={opensea}
              alt={"Opensea"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
