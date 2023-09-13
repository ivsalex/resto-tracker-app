import React, { useState, useEffect } from "react"

function OrderCard({ order, redirectToOrder }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, []);

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');

        return `${day}.${month} - ${hours}:${minutes}:${seconds}`;
    }

    return (
        <div key={order?._id} className="bg-white p-8 rounded-lg shadow-md cursor-pointer hover:bg-gray-100" onClick={() => redirectToOrder(order?._id)}>
            <p className="text-xl bold text-red-500"><strong>Table Number:</strong> {order?.tableNumber}</p>
            <div className="mt-2">
                <p className="truncate"><strong>Order ID:</strong> {order?._id}</p>
                <p><strong>Status:</strong> {order?.status}</p>
                <p><strong>Paid:</strong> {order?.isPaid?.toString()}</p>
                <p><strong>Total Pay:</strong> {order?.totalPay}</p>
                <p><strong>Created at:</strong> {formatTimestamp(order?.createdAt)}</p>
            </div>
        </div>
    )

}

export default OrderCard;