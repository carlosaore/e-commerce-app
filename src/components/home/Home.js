import Button from "./../atoms/button/Button";
import Banner from "../atoms/banner/Banner"
import { textData } from "./../../data/textData";
import { Link } from "react-router-dom";
import { ShopContext } from "./../../context/ShopContext";
import userlogged from "./../../styles/images/userlogged.jpg";
import userunknown from "./../../styles/images/userunknown.jpg";
import logo from "./../../styles/images/logo.jpg";
import SuperNav from "./../atoms/SuperNav"

const Home = () => (
  <ShopContext.Consumer>
    {(value) => (
      <main>
        <Banner/>
        {/* toggle function. icon---login modal */}
        <div>
          {!value.state.homeIconClicked ? (
            <SuperNav type="home"/>
          ) : (
            <div>
              {/* if i am not logged in it shows me the form */}
              {!value.state.isLoggedIn ? (
                <>
                  <img src={logo} alt="logo" />
                  <button onClick={value.homeIconToggle}>X</button>
                  <h1>{textData.login.title}</h1>
                  {value.state.loginFailed && <p>{textData.login.fail}</p>}
                  <p>{textData.login.user}</p>
                  <input onChange={value.username} value={value.state.username}></input>
                  <p>{textData.login.password}</p>
                  <input onChange={value.password} value={value.state.password}></input>
                  <button onClick={value.login}>{textData.login.submit}</button>
                  <Link to="/contact">
                    <h5>{textData.login.register}</h5>
                  </Link>
                  <Link to="/contact">
                    <h5>{textData.login.text1}</h5>
                  </Link>
                  <a href="https://www.google.com" target="_blank">
                    <h5>{textData.login.text2}</h5>
                  </a>
                  <a href="https://www.facebook.com" target="_blank">
                    <h5>{textData.login.text3}</h5>
                  </a>
                </>
              ) : (
                /* if im already logged in it shows me a logout button */
                <button onClick={value.logout}>logout</button>
              )}
            </div>
          )}
        </div>

        <div>
          <h1>{textData.homepage.title1}</h1>
          <h2>{textData.homepage.title2}</h2>
          <h2>{textData.homepage.title3}</h2>
        </div>
        <Link to="/shop">
          <Button text={textData.buttons.homepage.first} />
        </Link>
        <Link to="/map">
          <Button text={textData.buttons.homepage.second} />
        </Link>
        <Link to="/contact">
          <Button text={textData.buttons.homepage.third} />
        </Link>
      </main>
    )}
  </ShopContext.Consumer>
);

export default Home;
