import { createContext, useContext, useEffect, useState } from "react";

import API from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        try {
            const { data } = await API.get("/cart");

            setCartItems(data.cart?.items || []);
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = async (productId) => {
        try {
            await API.post("/cart/add", {
                productId,
                quantity: 1,
            });

            fetchCart();

            alert("Added to cart");
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await API.delete(`/cart/remove/${productId}`);

            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    const clearCart = async () => {
        try {
            await API.delete("/cart/clear");

            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                fetchCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);