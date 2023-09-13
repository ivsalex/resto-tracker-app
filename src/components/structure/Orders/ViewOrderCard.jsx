import React, { useState, useEffect } from "react";
import Button from "../../elements/Button";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";

function ViewOrderCard({ order, handleModifyOrder, handleOrderStatus, handleDeleteOrder, formatTimestamp, redirectToOrders }) {
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(loadingTimeout);
    }, []);

    const { orderId } = useParams();

    return (
        <div className="order-details p-2 flex-grow">
            {isLoading ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center justify-center">
                    <p className="text-xl">Loading order...</p>
                </div>
            ) : (
                <>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2 w-100">
                        <div className="flex text-center text-lg justify-center space-x-8">
                            <p><strong>Order ID:</strong> {order?._id}</p>
                            <p><strong>Table Number:</strong> {order?.tableId?.tableNumber}</p>
                            <p><strong>Order Status:</strong> {order?.status}</p>
                        </div>
                        <ul className="border-y py-2 overflow-y-auto max-h-[calc(100vh-300px)]">
                            {order?.orderItems?.map((item) => (
                                (auth?.role === 'Chef' && item.product?.type !== 'Drinks' ?
                                    <div key={item?._id} className="flex flex-col gap-4 py-2 border-b border-white bg-green-200 p-2">
                                        <div>
                                            <li><strong>Product: </strong>{item?.product?.name}</li>
                                            <li><strong>Description: </strong>{item.product?.description}</li>
                                            <li><strong>Price: </strong>{item.product?.price}</li>
                                            <li><strong>Quantity: </strong>{item.quantity}</li>
                                            <li><strong>Product Status: </strong>
                                                {item?.isReady === 'true' ?
                                                    <span className="font-bold text-green-500">{item?.isReady?.toString()}</span>
                                                    :
                                                    <span className="font-bold text-red-500">{item?.isReady?.toString()}</span>
                                                }
                                            </li>
                                        </div>
                                        <div>
                                            <Button
                                                onClick={() => handleOrderStatus(order?.orderItems, item)}
                                                size="tiny"
                                            >
                                                Modify Order Status
                                            </Button>
                                        </div>
                                    </div> :
                                    <div>
                                        <div key={item?._id} className="flex flex-col gap-4 py-2 border-b border-white bg-green-200 p-2">
                                            <li><strong>Product: </strong>{item?.product?.name}</li>
                                            <li><strong>Description: </strong>{item.product?.description}</li>
                                            <li><strong>Price: </strong>{item.product?.price}</li>
                                            <li><strong>Quantity: </strong>{item.quantity}</li>
                                            <li><strong>Product Status: </strong>{item.isReady.toString()}</li>
                                        </div>
                                    </div>)
                            ))}
                        </ul>
                        {auth.role === 'Waiter' &&
                            <div>
                                <p><strong>Total Pay:</strong> $ {order?.totalPay?.toFixed(2)}</p>
                                <p><strong>Is Paid:</strong> {order?.isPaid?.toString()}</p>
                            </div>
                        }
                        <p><strong>Created at:</strong> {formatTimestamp(order?.createdAt)}</p>
                    </div>

                    <div className="mt-4 flex justify-center items-center">
                        {auth?.role === 'Waiter' &&
                            <div className="">
                                <Button
                                    onClick={() => handleModifyOrder(orderId)}
                                    className="bg-marigold-500 hover:bg-marigold-600 text-white px-2 py-2 rounded-md focus:outline-none"
                                >
                                    Modify Order
                                </Button>
                                <Button
                                    onClick={() => handleDeleteOrder(orderId)}
                                    className="bg-tomato hover:bg-red-700 text-white px-2 py-2 rounded-md focus:outline-none"
                                >
                                    Delete Order
                                </Button>
                            </div>
                        }
                        <Button
                            onClick={redirectToOrders}
                            className="bg-zinc-400 hover:bg-zinc-500 text-white px-2 py-2 rounded-md focus:outline-none"
                        >
                            Go Back
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ViewOrderCard;