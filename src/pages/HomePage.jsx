import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const observer = useRef(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await API.get("/products");
            setProducts(response.data.products || response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addToCart = async (productId) => {
        try {
            await API.post("/cart/add", { productId, quantity: 1 });
            alert("Added to cart!");
        } catch (error) {
            alert("Please login first");
        }
    };

    const showDetails = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Intersection Observer for fade-in
    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.3 });

        const cards = document.querySelectorAll('.fade-in');
        cards.forEach(card => observer.current.observe(card));

        return () => observer.current?.disconnect();
    }, [products]);

    return (
        <>
            <Navbar />

            {/* Banner */}
            <div className="banner-container">
                <img
                    className="banner-image"
                    src="https://static.wixstatic.com/media/84770f_93b300330b3742f2b1948ef292a91f27~mv2_d_1920_1279_s_2.png"
                    alt="banner"
                />
                <div className="banner-overlay">
                    <h1 className="typing">Best Tech Products Online Shop</h1>
                    <p className="text-white mt-3">Experience next-level shopping 🚀</p>
                    <a className="banner-btn btn" href="#products">Shop Now</a>
                </div>
            </div>

            {/* Products Section */}
            <div className="container mt-5" id="products">
                <h1 className="text-center my-4 text-black fw-bold">Our Products</h1>

                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product._id || product.productId}
                                product={product}
                                addToCart={addToCart}
                                showDetails={showDetails}
                            />
                        ))
                    ) : (
                        <h3 className="text-center text-danger">No Products Found</h3>
                    )}
                </div>
            </div>

            {/* Product Modal */}
            {showModal && selectedProduct && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content custom-modal text-white">
                            <div className="modal-header border-0">
                                <h5 className="fw-bold">{selectedProduct.name || selectedProduct.productName}</h5>
                                <button
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body text-center">
                                <div className="modal-img-box">
                                    <img
                                        src={selectedProduct.images?.[0]?.url || selectedProduct.image || selectedProduct.productImg || "https://via.placeholder.com/300"}
                                        alt={selectedProduct.name}
                                    />
                                </div>

                                <h4 className="modal-price mt-3">
                                    ₹{selectedProduct.price || selectedProduct.Price}
                                </h4>

                                <p className="desc">
                                    {selectedProduct.description || "Premium quality product"}
                                </p>
                            </div>

                            <div className="modal-footer border-0 justify-content-center mb-4">
                                <button
                                    className="btn add-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}