import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import Button from "../../elements/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from "@fortawesome/free-solid-svg-icons";

function OrdersList({ orders, redirectToOrder, fetchOrdersData }) {
    const [isLoading, setIsLoading] = useState(true);
    const [lastRefreshTime, setLastRefreshTime] = useState(null);

    const refreshOrders = () => {
        fetchOrdersData();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            const currentTime = new Date();
            const formattedTime = currentTime.toLocaleTimeString();
            setLastRefreshTime(formattedTime);
        }, 500);
    };


    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(loadingTimeout);
    }, []);

    useEffect(() => {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString();
        setLastRefreshTime(formattedTime);
    }, [orders]);

    return (
        <div>
            <div className="flex flex-col p-2 justify-center items-center mb-4">
                <Button onClick={refreshOrders}
                        size="small"
                        variant="primary"
                        className="">
                    Refresh <FontAwesomeIcon icon={faSync} className="text-black-200" />
                </Button>
                {lastRefreshTime && (
                    <p className="text-gray-500">Last Refresh: {lastRefreshTime}</p>
                )}
            </div>
            <div className="order-details flex flex-wrap justify-center gap-4">
                {isLoading ? (
                    <div className="bg-white p-8 rounded-lg shadow-md text-center justify-center">
                        <p className="text-xl">Loading orders...</p>
                    </div>
                ) : orders.length >= 1 ? (
                    orders.map((order) => (
                        <OrderCard key={order._id} order={order} redirectToOrder={redirectToOrder} />
                    ))
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <p className="text-xl text-red-500">No orders available.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrdersList;