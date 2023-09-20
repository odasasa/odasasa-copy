"use client";

import { Typography } from "@/components";
import Modal from "@/components/molecules/Modal";
import { useEffect, useState } from "react";
import { WhatsappShareButton } from "react-share";

// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10.99 },
  { id: 2, name: "Product 2", price: 19.99 },
  { id: 3, name: "Product 3", price: 7.49 },
];

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<
    { id: number; name: string; price: number; quantity: number }[]
  >([]);

  const [visible, setVisibility] = useState(false);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {}, [cart]);

  const addToCart = (productId: number) => {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const product = products.find((p) => p.id === productId);
      if (product) {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const increaseQuantity = (productId: number) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const generateWhatsAppMessage1 = () => {
    const message = cart.map((item) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      return `${item.name} x${item.quantity} = $${subtotal}`;
    });

    const totalMessage = `Total: $${cartTotal.toFixed(2)}`;

    console.log(message.join("\n") + "\n\n" + totalMessage);
    // Combine the individual item messages and the total message
    return message.join("\n") + "\n\n" + totalMessage;
  };

  const generateWhatsAppMessage2 = () => {
    const itemsMessage = cart.map((item) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      return `${item.name} (x${item.quantity}) - $${subtotal}`;
    });

    const totalMessage = `Total: $${cartTotal.toFixed(2)}`;

    // Combine the individual item messages and the total message with line breaks
    return `Shopping Cart:\n${itemsMessage.join("\n")}\n\n${totalMessage}`;
  };

  const generateWhatsAppMessage3 = () => {
    const itemsMessage = cart.map((item) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      return `${item.name} (x${item.quantity}) - $${subtotal}`;
    });

    const totalMessage = `Total: $${cartTotal.toFixed(2)}`;

    // Combine the individual item messages and the total message with line breaks and separators
    return `🛒 Shopping Cart 🛒\n\n${itemsMessage.join(
      "\n"
    )}\n\n${totalMessage}`;
  };

  const generateWhatsAppMessage6 = (phoneNumber: string) => {
    const itemsMessage = cart.map((item) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      return `${item.name} (x${item.quantity}) - $${subtotal}`;
    });

    const totalMessage = `Total: $${cartTotal.toFixed(2)}`;

    // Combine the individual item messages and the total message with line breaks and separators
    const message = `🛒 Shopping Cart 🛒\n\n${itemsMessage.join(
      "\n"
    )}\n\n${totalMessage}`;

    // Encode the message and phone number for use in the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=254791784343&text=hello there`;
    //api.whatsapp.com/send?phone=254791784343&text=Hello%20MobileX%20Solution!

    https: return whatsappURL;
  };

  const generateWhatsAppMessage5 = (phoneNumber: string) => {
    const itemsMessage = cart.map((item) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      return `${item.name} (x${item.quantity}) - $${subtotal}`;
    });

    const totalMessage = `Total: $${cartTotal.toFixed(2)}`;

    // Combine the individual item messages and the total message with line breaks and separators
    const message = `🛒 Shopping Cart 🛒\n\n${itemsMessage.join(
      "\n"
    )}\n\n${totalMessage}`;

    // Encode the message and phone number for use in the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}&text=${encodedMessage}`;

    return whatsappURL;
  };

  const generateWhatsAppMessage = (phoneNumber: string) => {
    const itemsMessage = cart.map((item) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      return `${item.name} (x${item.quantity}) - $${subtotal}`;
    });

    const totalMessage = `Total: $${cartTotal.toFixed(2)}`;

    // Combine the individual item messages and the total message with line breaks and separators
    const message = `🛒 Shopping Cart 🛒\n\n${itemsMessage.join(
      "\n"
    )}\n\n${totalMessage}`;

    // Encode the message and phone number for use in the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return whatsappURL;
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <div className="mt-4">
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <span>{product.name}</span>
              <span>${product.price.toFixed(2)}</span>
              <button
                onClick={() => addToCart(product.id)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => setVisibility(true)}>Check out</button>
      <Modal isOpen={visible} onClose={setVisibility}>
        <div className="mt-8">
          <Typography variant="h2" className="text-center">
            Cart
          </Typography>
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-2 border-b"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</p>
          </div>
        </div>
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          {/* ... (previous code) */}
          <div className="mt-4">
            <p className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</p>

            <button
              onClick={() =>{
                setVisibility(false)
                window
                  .open(generateWhatsAppMessage("254727654531"), "_blank")
                  ?.focus()
                }
              }
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              Share on WhatsApp
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
