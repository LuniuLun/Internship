import React from "react";
import { useCartStore } from "./store/cartStore";
import Counter from "./components/Counter";

const ProductList: React.FC = () => {
  const { addToCart, cart, removeFromCart, clearCart } = useCartStore();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const products = [
    { id: "1", name: "Laptop", price: 1000 },
    { id: "2", name: "Phone", price: 500 },
    { id: "3", name: "Tablet", price: 300 },
  ];

  return (
    <div>
      <Counter />

      <h1>My Shop</h1>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button
              onClick={() => addToCart({ ...product, quantity: 1 })}
              style={{ marginLeft: "10px" }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <div>
        🛒 Cart: <strong>{totalQuantity}</strong>
      </div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - {item.quantity}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
