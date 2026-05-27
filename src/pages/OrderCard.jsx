const OrderCard = ({ order }) => {
    return (
        <div className="col-md-6 mb-4">

            <div
                className="p-4"
                style={{
                    background: "rgba(0,0,0,0.7)",
                    borderRadius: "20px",
                    color: "white",
                    backdropFilter: "blur(10px)",
                }}
            >

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <div>
                        <h5 className="fw-bold">
                            Order
                        </h5>

                        <small>
                            {new Date(
                                order.createdAt
                            ).toLocaleString()}
                        </small>
                    </div>

                    <span
                        className="badge"
                        style={{
                            background:
                                "linear-gradient(135deg,#00ffcc,#00c6ff)",
                            color: "black",
                            padding: "10px",
                            borderRadius: "20px",
                        }}
                    >
                        Delivered
                    </span>

                </div>

                <hr />

                {
                    order.orderItems?.map((item) => (
                        <div
                            key={item.product}
                            className="d-flex align-items-center justify-content-between mb-3"
                        >

                            <div className="d-flex align-items-center gap-3">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />

                                <div>
                                    <h6 className="mb-1">
                                        {item.name}
                                    </h6>

                                    <small>
                                        Qty: {item.quantity}
                                    </small>
                                </div>

                            </div>

                            <div className="fw-bold text-warning">
                                ₹
                                {item.price *
                                    item.quantity}
                            </div>

                        </div>
                    ))
                }

                <hr />

                <div className="d-flex justify-content-between fw-bold">

                    <span>Total</span>

                    <span className="text-info">
                        ₹{order.totalPrice}
                    </span>

                </div>

            </div>

        </div>
    );
};

export default OrderCard;