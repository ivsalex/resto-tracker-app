import React from "react";
import ProductCard from "./ProductCard";

function ProductsList({ filteredProducts, addToOrderTab }) {
    return (
        <div className="flex max-h-screen">
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto mx-2">
                <div className="container mx-auto py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filteredProducts?.map((product) => (
                        <ProductCard key={product._id} product={product} addToOrderTab={addToOrderTab} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductsList;