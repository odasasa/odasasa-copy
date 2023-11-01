"use client";
import { strCapitalize } from "@/utils";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { User } from "@/types/core";
import { useGlobalContext } from "@/context/GlobalContext";
const customerFields = [
  { label: "Name", name: "name", type: "text" },
  { label: "Phone", name: "phone", type: "text" },
  { label: "Location", name: "location", type: "text" },
];

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  shopDetails: User | null;
  onItemRemove: (index: number) => void;
  onItemIncrement: (index: number) => void;
  onItemDecrement: (index: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  shopDetails,
  onItemRemove,
  onItemIncrement,
  onItemDecrement,
}) => {
  const {
    data: { shoppingCart: cartItems },
    setData,
  } = useGlobalContext();

  const [customer, setCustomer] = useState<{
    name: string;
    phone: string;
    location: string;
  }>({ name: "", phone: "", location: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  console.log({ shopDetails });
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const generateWhatsAppMessage = (phoneNumber: string) => {
    const itemsMessage = items.map((item) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      return `${item.name} (x${item.quantity}) - KES ${subtotal}`;
    });
    /*
Let's change it to this ...👇🏻



odasasa.com

New order request

Fresh pineapple (×1) - KES 80
Fresh Avocados (×1) - KES 30 
Mahragwe (×1) - KES 120
Dengu Nzima (×1) - KES 140
Mazie Seeds (×2) - KES 300

Total: KES 670

My details:
Mubarak Abdalla
0727654531
Ground floor,CBA building.
 
*/
// 🛒 Shopping Cart 🛒\n
    const customerDetails = `
     *My Details:*
     ${strCapitalize(customer?.name!)}
       ${strCapitalize(customer?.phone!)}
       ${strCapitalize(customer?.location!)}
     `;
    const totalMessage = `Total: $${calculateTotalAmount().toFixed(2)}`;

    // Combine the individual item messages and the total message with line breaks and separators
    const message = `
    odasasa.com 

    New order request 
    
     ${itemsMessage.join("\n")}\n${totalMessage}\n
     ${customerDetails}\n`;
    // Encode the message and phone number for use in the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${
      shopDetails?.whatsappNumber || phoneNumber
    }?text=${encodedMessage}`;

    return whatsappURL;
  };

  const customerForm = (
    <div className="px-2 md:px-6 w-full">
      {cartItems.length > 0 &&
        customerFields.map((field) => (
          <div key={field.name} className="my-2 md:my-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              onChange={handleChange}
              required={true}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
    </div>
  );
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
            <span>Ksh. {calculateTotalAmount()}</span>
            <br />
            {customerForm}
            {
              <button
                // disabled ={Object.values(customer).includes("")}
                onClick={() => {
                  if (Object.values(customer).includes(""))
                    return Swal.fire("Fill Customer Details");
                  window
                    .open(
                      generateWhatsAppMessage(
                        shopDetails?.whatsappNumber || "254727654531"
                      ),
                      "_blank"
                    )
                    ?.focus();
                }}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                Share on WhatsApp
              </button>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
