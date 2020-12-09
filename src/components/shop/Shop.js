import { Switch, Route, Link } from "react-router-dom";
import ShopBanner from "./shop-banner";
import SingleShop from "./remote-shop/SingleShop";
import jewerly from "./../../styles/images/jewelry.png";
import jacket from "./../../styles/images/jacket.png";
import laptop from "./../../styles/images/laptop.png";
import ShopIconWrap from "./shop-icon-wrap";
import Spinner from "../atoms/spinner";
import { MyAPIContext } from "./../../context/APIContext";
import "./Shop.css";
import Navbar from "./../atoms/navbar/Navbar";
import SuperNav from "./../atoms/SuperNav/SuperNav";
import SingleShopCard from "./remote-shop/SingleShopCard";
import Button from "../atoms/button/Button";
import ButtonX from "../atoms/button/ButtonX";
import Hr from "../atoms/text/Hr"

const Shop = (props) => (
  <MyAPIContext.Consumer>
    {(value) =>
    <>
    <SuperNav />
    <Hr />
    <Navbar />
      {value.state.loading ? (
        <Spinner />
      ) : (
        <>
        <Switch>
          <Route exact path="/shop">
            <div className="shop_container">
              <ShopBanner
                title="LOCAL JEWELRY SHOPS"
                text="Lorem lorem lorem lorem lorem lorem"
                image={jewerly}
              />
              <ShopIconWrap category="category1" />
              <ShopBanner
                title="LOCAL CLOTHES SHOPS"
                text="Lorem lorem lorem lorem lorem lorem"
                image={jacket}
              />
              <ShopIconWrap category="category2" />
              <ShopBanner
                title="LOCAL ELECTRONIC SHOPS"
                text="Lorem lorem lorem lorem lorem lorem"
                image={laptop}
              />
              <ShopIconWrap category="category3" />
            </div>
          </Route>

          {value.state.items.map((category, categoryIndex) =>
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
                    name={value.state.items[category].shops[shop][index].name}
                    key={props.index}
                    price={value.state.items[category].shops[shop][index].price}
                  />
                  <Link to={`/shop/category${category + 1}/${shop}`}>BACK</Link>
                </>
              );
            }}
          />
        </Switch>
        </>
      )}
      </>
    }
  </MyAPIContext.Consumer>
);

export default Shop;
