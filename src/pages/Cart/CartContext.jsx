import { createContext, useContext, useState } from "react";

// 1. Create the context container
const CartContext = createContext();

// 2. Provider component to wrap around App
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Function to add or update items in the cart
  const addToCart = (product, quantity) => {
    // If quantity is 0 or less, default to at least 1
    const qtyToAdd = quantity > 0 ? quantity : 1;

    setCartItems((prevItems) => {
      // Check if product is already in the cart
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Increment quantity if it exists
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }

      // Add as a new item if it's not in the cart
      return [...prevItems, { ...product, quantity: qtyToAdd }];
    });
  };

  // Function to remove an item completely
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom hook for easy access in components
export const useCart = () => useContext(CartContext);