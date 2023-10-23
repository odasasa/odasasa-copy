"use client";
import { strCapitalize } from "@/utils";
import React from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  customer: { name: string; phone: string; location: string };
  onItemRemove: (index: number) => void;
  onItemIncrement: (index: number) => void;
  onItemDecrement: (index: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  customer,
  onItemRemove,
  onItemIncrement,
  onItemDecrement,
}) => {
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const generateWhatsAppMessage = (phoneNumber: string) => {
    const itemsMessage = items.map((item) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      return `${item.name} (x${item.quantity}) - $${subtotal}`;
    });

    const customerDetails = `
     *Customer Details:*\n
     ${strCapitalize(customer?.name!)},
       ${strCapitalize(customer?.phone!)},
       ${strCapitalize(customer?.location!)}
     `;
    const totalMessage = `Total: $${calculateTotalAmount().toFixed(2)}`;

    // Combine the individual item messages and the total message with line breaks and separators
    const message = `🛒 Shopping Cart 🛒\n
     ${customerDetails}\n
     ${itemsMessage.join("\n")}\n\n${totalMessage}\n\n`;

    // Encode the message and phone number for use in the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return whatsappURL;
  };

  return (
    <div className="shopping-cart">
      {/* <h2>Shopping Cart</h2> */}
      {items.length === 0 ? (
        <p className="w-full h-full flex justify-center items-center">
          Your cart is empty.
        </p>
      ) : (
        <div>
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className="w-full grid grid-cols-5 gap-3 mb-1 border-b p-2"
              >
                <span className=" col-span-2">
                  {item.name} x {item.quantity}
                </span>
                <span>Ksh. {item.price * item.quantity}</span>
                <div className="col-span-2 grid grid-cols-3 ">
                  <button
                    className={" rounded-md bg-product-blue"}
                    onClick={() => onItemIncrement(index)}
                  >
                    +
                  </button>
                  <button
                    className={" rounded-sm bg-red-500"}
                    onClick={() => onItemDecrement(index)}
                  >
                    -
                  </button>

                  <button
                    onClick={() => onItemRemove(index)}
                    className={
                      " rounded-md bg-slate-500 flex justify-center items-center"
                    }
                  >
                    <FaTrash className="" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-amount font-bold text-xl">
            <span>Total Amount:</span>
            <span>${calculateTotalAmount()}</span>
            <br />
            <button
              // disabled ={Object.values(customer).includes("")}
              onClick={() => {
                if (Object.values(customer).includes(""))
                  return Swal.fire("Fill Customer Details");
                window
                  .open(generateWhatsAppMessage("254727654531"), "_blank")
                  ?.focus();
              }}
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              Share on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
