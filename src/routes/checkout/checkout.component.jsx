import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
const CheckoutPage = () => {
    const {cartItems} = useContext(CartContext)
    
    return (
        <div>
            {cartItems.map((item)=> (<p>{item.name} ---- {item.quantity}</p>))}
        </div>
    )
}

export default CheckoutPage;