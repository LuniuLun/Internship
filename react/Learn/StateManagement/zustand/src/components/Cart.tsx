import React from "react";
import { useCartStore } from "../store/cartStore";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button onClick={clearCart} style={{ marginTop: "10px" }}>
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default Cart;
