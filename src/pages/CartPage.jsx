import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/cart.css";

export default function CartPage() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchCart();
        }
    }, []);

    const fetchCart = async () => {
        try {
            const { data } = await axios.get("https://mern-techshop-backend.onrender.com/api/cart", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(data.cart || data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, newQty) => {
        try {
            const currentItem = cart?.items?.find(
                item => item.product === productId
            );

            const currentQty = currentItem ? currentItem.quantity : 0;
            const quantityToAdd = newQty - currentQty;

            if (newQty <= 0) {
                await axios.delete(
                    `https://mern-techshop-backend.onrender.com/api/cart/remove/${productId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                fetchCart();
                return;
            }

            if (quantityToAdd !== 0) {
                await axios.post(
                    "https://mern-techshop-backend.onrender.com/api/cart/add",
                    { productId, quantity: quantityToAdd },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            }

            fetchCart();
        } catch (err) {
            console.error(err);
            alert("Failed to update quantity");
        }
    };

    const removeItem = async (productId) => {
        try {
            await axios.delete(
                `https://mern-techshop-backend.onrender.com/api/cart/remove/${productId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            fetchCart();
        } catch (error) {
            alert("Failed to remove item");
        }
    };

    const placeOrder = async () => {
        try {
            await axios.post(
                "https://mern-techshop-backend.onrender.com/api/orders/new",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            alert("Order Placed Successfully! 🎉");
            navigate("/orders");
        } catch (error) {
            console.error(error);
            alert("Failed To Place Order");
        }
    };

    const getTotal = () => {
        if (!cart?.items) return 0;
        return cart.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
    };

    if (loading)
        return (
            <div className="cart-loading">
                <h3>Loading Cart...</h3>
            </div>
        );

    return (
        <>
            <Navbar />

            <div className="cart-page">
                <h1 className="cart-title mt-5">Your Cart</h1>

                {/* ✅ WRAP ONLY GRID */}
                <div className="cart-grid-wrapper">
                    <div className="cart-grid">
                        {!cart?.items?.length ? (
                            <div className="empty-cart">
                                <h3>🛒 Your cart is empty</h3>
                                <p>Add something beautiful to your cart</p>
                            </div>
                        ) : (
                            cart.items.map((item) => {
                                const itemTotal =
                                    item.price * item.quantity;

                                return (
                                    <div
                                        className="cart-card"
                                        key={item.product}
                                    >
                                        <div className="img-box">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        </div>

                                        <div className="cart-info">
                                            <h4>{item.name}</h4>
                                            <p className="price">
                                                ₹{item.price}
                                            </p>

                                            <div className="qty">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="total">
                                                ₹{itemTotal.toFixed(2)}
                                            </p>

                                            <button
                                                className="remove"
                                                onClick={() =>
                                                    removeItem(item.product)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* ✅ SUMMARY OUTSIDE GRID */}
                {cart?.items?.length > 0 && (
                    <div className="summary">
                        <p>
                            <span>Subtotal</span>
                            <strong>₹{getTotal().toFixed(2)}</strong>
                        </p>

                        <p>
                            <span>Shipping</span>
                            <strong>
                                ₹{(getTotal() * 0.05).toFixed(2)}
                            </strong>
                        </p>

                        <hr />

                        <p className="total-line">
                            <span>Total</span>
                            <strong>
                                ₹{(getTotal() * 1.05).toFixed(2)}
                            </strong>
                        </p>

                        <button
                            className="buy-btn"
                            onClick={placeOrder}
                        >
                            Buy Now
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}