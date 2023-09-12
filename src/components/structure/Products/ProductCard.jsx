import React from "react";
import Button from "../../elements/Button";

function ProductCard({ product, addToOrderTab }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex">
            <div className="w-1/2">
                <img
                    src={`${product?.image}`}
                    className="w-full mx-auto"
                    alt={product?.name}
                    loading="lazy"
                />
            </div>

            <div className="flex flex-col w-1/2 px-4">
                <div className="name-container mt-4">
                    <h3 className="text-lg font-semibold overflow-hidden">
                        {product?.name}
                    </h3>
                </div>

                {product?.description && (
                    <div className="description-container overflow-hidden h-26">
                        <p className="text-sm text-gray-600 mb-4">
                            {product?.description} <strong>({product?.weight})</strong>
                        </p>
                    </div>
                )}

                <div className="text-right mt-auto p-2">
                    <p className="text-green-600 font-semibold text-right p-2">$ {product?.price}</p>

                    {addToOrderTab && (
                        <Button
                            className="text-black bg-marigold-500 hover:bg-marigold-600 rounded-2xl focus:outline-none"
                            onClick={() => addToOrderTab(product)}
                        >
                            Add to Order
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;