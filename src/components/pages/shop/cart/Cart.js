import React, { useContext } from "react";
import { ShopContext } from "../../../../context/ShopContext";
import Modal from "react-modal";
import styled from "styled-components";

import CartItem from "../cart-item/CartItem";
import Text from "../../../atoms/text/Text";
import TextCart from "../../../atoms/text/TextCart";
import Button from "../../../atoms/button/Button";
import Hr from "../../../atoms/hr/Hr";
import StripeCheckoutButton from "../stripe-button";

import { theme } from "../../../../data/theme";
import cart from "../../../../data/images/cart.png";
import { textData } from "../../../../data/textData";

const StyledCart = styled.div`
  display: flex;
  cursor: pointer;
  gap: calc(2 * ${theme.spacer});
`;

Modal.setAppElement("#root");

const SuperNavImg = styled.img`
  width: auto;
  height: ${theme.sizes.buttons.S};
  cursor: pointer;
  /* animation */
  transition: ${theme.transition};
  :hover {
    transform: ${theme.scale};
  }
`;

const StyledCartGridSection = styled.div`
  display: grid;
  gap: ${theme.spacer};
  grid-template-columns: repeat(auto-fit, minmax(75%, 1fr));
  justify-items: center;
  margin: ${theme.spacer} auto calc(5 * ${theme.spacer});
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

const StyledCartLastSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacer};
  margin: ${theme.spacer} auto;
  div {
    display: flex;
    gap: ${theme.spacer};
  }
  @media (max-width: ${theme.viewport.mobile}) {
    button {
      font-size: ${theme.fonts.sizes.S};
    }
  }
`;

const Cart = ({ textColor, type }) => {

  const shopContext = useContext(ShopContext);

  if (shopContext.payment) {
    shopContext.cartToggle();
  }

  const findItem = (arr) => arr.find((el, id) => el[id] === id);

  const findQuantity = (arr) => arr.filter((el) => console.log(el, 'EL'));

  const onIncrease = (e) => {
    console.log('yooo0')
    console.log(e.target.id)
    let element = shopContext.cart.filter((value, index, self) => self.indexOf(value) === index)[Number(e.target.id)];
    let copyOfItems = [...shopContext.cart];
    copyOfItems.push(element);
    shopContext.setCart(copyOfItems);
    return e.target.id;
  };

  const onRemoveClick = (e) => {
    let element = findItem(shopContext.cart, Number(e.target.id));
    const index = shopContext.cart.indexOf(element);

    let copyOfItems = [...shopContext.cart];
    copyOfItems.splice(index, 1);
    shopContext.setCart(copyOfItems);
  };

  const deleteItem = (e) => {
    let element = findItem(shopContext.cart, Number(e.target.id));
    let copyOfItems = [];
    shopContext.cart.map(
      (item) => item.name !== element.name && copyOfItems.push(item)
    );
    shopContext.setCart(copyOfItems);
  };

  const renderAddedItems = (arr) => {
    return arr
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(({  name, price, imageL }, i) => {
        return (
          <CartItem
            key={i}
            name={name.split(" ").slice(0, 3).join(" ")}
            image={imageL}
            price={`Price ${price.toFixed(2)}`}
            increase={onIncrease}
            decrease={onRemoveClick}
            remove={deleteItem}
            quantity={'1'}
            id={i}
          />
        );
      });
  };

  const clearAllItems = () => {
    shopContext.setCart("");
  };

  const getTotalPrice = () => {
    if (!shopContext.cart) {
      return 0;
    }
    let arr = [];
    shopContext.cart.map((el) => arr.push(el.price));
    const result = arr.reduce((acc, val) => acc + val, 0);
    return result.toFixed(2);
  };

  return (
    <>
      <StyledCart onClick={shopContext.cartToggle}>
        {type !== "mobile" && (
          <Text color={textColor} size="S" text={`${getTotalPrice()}£`} />
        )}
        <SuperNavImg src={cart} alt="cart" />
        {shopContext.cart.length > 0 && (
          <TextCart
            size="S"
            color={textColor}
            text={shopContext.cart && shopContext.cart.length}
          />
        )}
      </StyledCart>
      <Modal
        isOpen={shopContext.state.cartShown}
        onRequestClose={shopContext.cartToggle}
        contentLabel="shopping-cart"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        {!shopContext.cart.length ? (
          <Text
            size="L"
            color="primary"
            text={textData.shop.cart.empty}
            align="center"
          />
        ) : (
          <StyledCartGridSection>
            {renderAddedItems(shopContext.cart)}
          </StyledCartGridSection>
        )}
        <Hr />
        <StyledCartLastSection>
          <Button
            size="M"
            color="primary"
            action={shopContext.cartToggle}
            text={textData.shop.cart.exit}
            width="parent"
          />
          {shopContext.cart.length>0 && <Button
            size="M"
            color="primary"
            text={textData.shop.cart.clear}
            action={clearAllItems}
            width="parent"
          />}
          <div>
            <Text size="M" color="dark" text={textData.shop.cart.items} />
            <Text size="M" color="primary" text={shopContext.cart.length} />
          </div>
          <div>
            <Text size="M" color="dark" text={textData.shop.cart.price} />
            <Text size="M" color="primary" text={`${getTotalPrice()} £`} />
          </div>
        </StyledCartLastSection>
        {shopContext.state.isLoggedIn ? (
          <StripeCheckoutButton price={getTotalPrice()} />
        ) : (
          <StyledCartLastSection>
          <Button
            width="parent"
            size="M"
            color="primary"
            text={textData.shop.checkout.notLogged}
            action={()=>{shopContext.loginIconToggle()}}
          />
         </StyledCartLastSection>
        )}
      </Modal>
    </>
  );
};

export default Cart;
