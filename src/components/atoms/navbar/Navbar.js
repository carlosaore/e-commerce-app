import React, { Component } from "react";
import { ShopContext } from "../../../context/ShopContext";
import {
  StyledNav,
  StyledLink,
  LogoLink,
  LogoImg,
} from "../../../styles/styles";
import logo from "./../../../styles/images/logonorris.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ShopContext.Consumer>
        {(value) => (
          <>
            <StyledNav onLoad={value.navbarToggle}>
              {this.props.type !== "home" && (
                <>
                  <LogoLink to="/home" onClick={value.closeLogin}>
                    <LogoImg src={logo} alt="logo" />
                  </LogoLink>
                  <StyledLink to="/home" onClick={value.closeLogin}>
                    HOME
                  </StyledLink>
                </>
              )}
              
              <StyledLink to="/shop" onClick={value.closeLogin}>
                SHOP
              </StyledLink>
              <StyledLink to="/map" onClick={value.closeLogin}>
                MAP
              </StyledLink>
              <StyledLink to="/contact" onClick={value.closeLogin}>
                CONTACT
              </StyledLink>
            </StyledNav>
          </>
        )}
      </ShopContext.Consumer>
    );
  }
}

export default Navbar;
