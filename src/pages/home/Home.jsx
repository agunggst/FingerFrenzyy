import { Link } from 'react-router-dom';
import './home.css'

const logo = "./assets/icons/logo.png"
const strawberry = "./assets/fruits/Strawberry.png";
const grapes = "./assets/fruits/Grape.png";
const banana = "./assets/fruits/Banana.png";
const orange = "./assets/fruits/Orange.png";
const watermelon = "./assets/fruits/WaterMelon.png";
const apple = "./assets/fruits/Apple.png";
const pear = "./assets/fruits/Pear.png";

const Home = () => {
  return (
    <>
      <div className='home-page' style={{ backgroundImage: "url('/assets/fruits/background2.png')" }}>
        <img src={grapes} className="grapes rotatereverse" alt="fruit" />
        <img src={banana} className="banana rotate" alt="fruit" />
        <img src={orange} className="orange rotatereverse" alt="fruit" />
        <img src={strawberry} className="strawberry rotate" alt="fruit" />
        <div className="center">
          <div className="zoom-in">
            <img src={logo} alt="logo" className='logo'/>
            <h3>Welcome to <span>Fingger Frenzyy!</span></h3>
            <div className="home-buttons-nav">
              <div className="button">
                <Link to={{pathname:'/leaderboard'}}>
                  <h4>Leaderboard</h4>
                </Link>
              </div>
              <div className="button">
                <h4>About</h4>
              </div>
              <div className="button" >
                <h4>How To Play</h4>
              </div>
            </div>
            <div className="play-button-container">
              <h4 className="play-button">Play Now</h4>
            </div>
          </div>
        </div>
        <img src={watermelon} className="watermelon rotate" alt="fruit" />
        <img src={orange} className="strawberry2 rotatereverse" alt="fruit" />
        <img src={apple} className="apple rotatereverse" alt="fruit" />
        <img src={pear} className="pear rotate" alt="fruit" />
      </div>
    </>
  )
}

export default Home