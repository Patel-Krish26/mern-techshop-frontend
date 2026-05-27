import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/order.css";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchMyOrders();
        }
    }, []);

    const fetchMyOrders = async () => {
        try {
            const response = await axios.get(
                "https://mern-techshop-backend.onrender.com/api/orders/my-orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setOrders(response.data.orders || response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = (items) => {
        if (!items || !Array.isArray(items)) return 0;
        return items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
    };

    if (loading) {
        return <div className="text-center mt-5 text-white"><h3>Loading Your Orders...</h3></div>;
    }

    return (
        <>
            <Navbar />

            <div className="container mt-5 p-5">
                <h1 className="text-center m-4 p-4 text-black fw-bold">Your Orders</h1>

                <div className="row g-4">
                    {orders.length === 0 ? (
                        <div className="col-12 text-center py-5">
                            <h4 className="text-white">No Orders Found</h4>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div className="col-md-6" key={order._id || order.orderId}>
                                <div className="order-card fade-scroll">
                                    {/* HEADER */}
                                    <div className="order-header d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="mb-1 fw-bold">
                                                Order #{(order._id || order.orderId)?.slice(-6)}
                                            </h6>
                                            <small className="text-white">
                                                {new Date(order.createdAt || order.orderDate).toLocaleString()}
                                            </small>
                                        </div>
                                        <span className="status-badge">Delivered</span>
                                    </div>

                                    {/* ITEMS */}
                                    <div className="order-items">
                                        {(order.orderItems || order.items || []).map((item, idx) => (
                                            <div className="order-item" key={idx}>
                                                <img
                                                    src={item.image || item.productImg}
                                                    alt={item.name}
                                                />
                                                <div className="flex-grow-1">
                                                    <div className="fw-bold">{item.name}</div>
                                                    <small>Qty: {item.quantity}</small>
                                                </div>
                                                <div className="text-end">
                                                    <div className="price">₹{item.price}</div>
                                                    <div className="total">
                                                        ₹{(item.price * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <hr className="my-3" />

                                    {/* SUMMARY */}
                                    <div className="order-summary">
                                        <div className="d-flex justify-content-between total-row">
                                            <span>Total</span>
                                            <span>₹{calculateTotal(order.orderItems || order.items)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default OrdersPage;