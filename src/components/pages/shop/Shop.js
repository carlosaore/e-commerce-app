import React, { useContext } from 'react';
import { MyContext } from './../../../context/APIContext';
import {ShopContext} from "./../../../context/ShopContext"
import { Switch, Route, Link } from "react-router-dom";

import ShopBanner from "./shop-banner";
import SingleShop from "./remote-shop/SingleShop";
import ShopIconWrap from "./shop-icon-wrap";
import Spinner from "../../atoms/spinner";
import SingleShopCard from "./remote-shop/SingleShopCard";
import MainNavbar from "../../atoms/mainNavbar/MainNavbar";

import "./Shop.css";
import jewerly from "./../../../styles/images/jewelry.png";
import jacket from "./../../../styles/images/jacket.png";
import laptop from "./../../../styles/images/laptop.png";


const Shop = (props) => {

  const context = useContext(MyContext);
  return (
    <ShopContext.Consumer>
    {value => (
      <>
      <MainNavbar />
        {context.loading ? (
          <Spinner />
        ) : (
          <>
          {!value.state.mobileMenu && <Switch>
            <Route exact path="/shop">
              <div className="shop_container">
                <ShopBanner
                  title="LOCAL JEWELRY SHOPS"
                  text="Lorem lorem lorem lorem lorem lorem"
                  image={jewerly}
                />
                <ShopIconWrap category="category1" id="0" />
                <ShopBanner
                  title="LOCAL CLOTHES SHOPS"
                  text="Lorem lorem lorem lorem lorem lorem"
                  image={jacket}
                />
                <ShopIconWrap category="category2" id="1"/>
                <ShopBanner
                  title="LOCAL ELECTRONIC SHOPS"
                  text="Lorem lorem lorem lorem lorem lorem"
                  image={laptop}
                />
                <ShopIconWrap category="category3" id="2"/>
              </div>
            </Route>

            {context.state && context.state.items.map((category, categoryIndex) =>
              category.shops.map((shops, shopsIndex) => {
                let link = `/shop/category${categoryIndex + 1}/${shopsIndex}`;
                return (
                  <Route exact path={link}>
                    <SingleShop category={categoryIndex + 1} shop={shopsIndex} />
                  </Route>
                );
              })
            )}

            <Route
              render={() => {
                const regExp = /\d+\/\d+\/\d+/;
                let res = props.location.pathname
                  .match(regExp)[0]
                  .split("/")
                  .map((el) => Number(el));
                const category = res[0] - 1;
                const shop = res[1];
                const index = res[2];
                return (
                  <>
                  <SingleShopCard
                    name={context.state.items[category].shops[shop][index].name}
                    key={props.index}
                    price={context.state.items[category].shops[shop][index].price}
                  />
                  <Link to={`/shop/category${category + 1}/${shop}`}>BACK</Link>
                  </>
                );
              }}
            />
          </Switch>}
          </>
        )}
      </>
    )}
        </ShopContext.Consumer>
    )

            };

export default Shop;