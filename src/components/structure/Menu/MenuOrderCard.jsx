import React from "react";
import Button from "../../elements/Button";
import { useParams } from 'react-router-dom';

function MenuOrderCard({ orderProducts, incrementQuantity, decrementQuantity, modifyOrder }) {
    const { orderId } = useParams();

    const totalPay = orderProducts.reduce((total, product) => {
        const productPrice = product.price;
        const productQuantity = product.quantity;
        const productTotal = productPrice * productQuantity;
        return total + productTotal;
    }, 0);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md max-h-[calc(100vh-200px)] overflow-y-auto mt-20">
            <h2 className="text-2xl font-semibold mb-4 text-center">Order Detail:</h2>
            {orderProducts.map((product) => {
                return (
                    <div
                        className="flex items-center bg-white p-2 rounded-lg m-2 border"
                        key={product?._id}
                    >
                        <div className="flex-grow">
                            <div className="text-base font-bold">
                                <div className="mx-2 text-center">{product?.name}</div>
                                <div className="flex items-center justify-center mt-2 w-auto">
                                    <Button size="tiny" className="mx-2" onClick={() => decrementQuantity(product)}>
                                        -
                                    </Button>
                                    <div>{product?.quantity}</div>
                                    <Button size="tiny" className="mx-2" onClick={() => incrementQuantity(product)}>
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src={`${product?.image}`}
                                className="w-24"
                                alt={product?.name}
                            />
                            <h3 className="text-center">$ {product?.totalPrice?.toFixed(2)}</h3>
                        </div>
                    </div>
                );
            })}
            <div className="mt-4 mx-2 bg-white text-center flex justify-between items-center border p-2">
                <h3 className="text-lg font-semibold m-2">Total Pay:</h3>
                <div className="text-lg font-bold text-tomato">$ {totalPay.toFixed(2)}</div>
            </div>
            <Button className="w-full my-4" onClick={() => modifyOrder(orderProducts, orderId)}>Send Order!</Button>
        </div>
    );
}

export default MenuOrderCard;