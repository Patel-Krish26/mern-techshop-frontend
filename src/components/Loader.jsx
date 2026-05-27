const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div
                className="spinner-border text-light"
                style={{
                    width: "4rem",
                    height: "4rem",
                }}
                role="status"
            >
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>
        </div>
    );
};

export default Loader;