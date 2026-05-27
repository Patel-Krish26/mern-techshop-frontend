export default function ProductCard({
    product,
    addToCart,
    showDetails,
}) {

    const image =
        product?.images?.[0]?.url ||
        "https://via.placeholder.com/300x200?text=No+Image";

    return (
        <div className="hover-card p-3 fade-in">

            {/* IMAGE */}
            <div className="product-img-box">
                <img
                    src={image}
                    alt={product.name}
                />
            </div>

            {/* CONTENT */}
            <div className="card-body product-body">

                <h5 className="product-title">
                    {product.name}
                </h5>

                <p className="product-price">
                    ₹{product.price}
                </p>

                {/* BUTTONS */}
                <div className="btn-group-custom">

                    <button
                        className="btn btn-outline-light w-100"
                        onClick={() => addToCart(product._id)}
                    >
                        Add To Cart
                    </button>

                    <button
                        className="btn btn-outline-light w-100"
                        onClick={() => showDetails(product)}
                    >
                        View Details
                    </button>

                </div>

            </div>
        </div>
    );
}