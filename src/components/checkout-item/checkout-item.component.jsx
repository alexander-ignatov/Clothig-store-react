import { useDispatch, useSelector } from 'react-redux';


import {
  RemoveButton,
  Name,
  Quantity,
  Price,
  ImageContainer,
  CheckoutItemContainer,
  Arrow,
  Value,
} from './checkout-item.styles';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  const incrementHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  const decrementHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

  const clearHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));


  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={decrementHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={clearHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
