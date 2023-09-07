import React from 'react';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onItemRemove: (index: number) => void;
  onItemIncrement: (index: number) => void;
  onItemDecrement: (index: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onItemRemove,
  onItemIncrement,
  onItemDecrement,
}) => {
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <span>${item.price}</span>
                <div className="quantity-controls">
                  <button onClick={() => onItemDecrement(index)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onItemIncrement(index)}>+</button>
                </div>
                <button onClick={() => onItemRemove(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="total-amount">
            <span>Total Amount:</span>
            <span>${calculateTotalAmount()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
