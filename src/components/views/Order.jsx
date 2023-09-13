import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ViewOrderCard from "../structure/Orders/ViewOrderCard";
import Cookies from 'js-cookie';

export const Order = () => {
    const [order, setOrder] = useState({});
    const { orderId } = useParams();
    const navigate = useNavigate();

    const fetchOrderData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get("token")
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setOrder(data?.order);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');

        return `${day}.${month} - ${hours}:${minutes}:${seconds}`;
    }

    const redirectToOrders = () => {
        navigate(`/orders`);
    };

    const handleModifyOrder = (orderId) => {
        navigate(`/orders/modify/${orderId}`);
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get("token")
                }
            });

            const orderDeleteResult = await response.json();
            console.log(orderDeleteResult);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            redirectToOrders();

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleOrderStatus = async (orderProducts, product) => {
        try {
            const updatedProducts = orderProducts.map((actualProduct) => {
                if (product._id === actualProduct._id) {
                    return (
                        {
                            ...actualProduct,
                            quantity: actualProduct.quantity,
                            isReady: !actualProduct.isReady,
                        }
                    )
                }
                return actualProduct;
            });

            const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get("token")
                },
                body: JSON.stringify(updatedProducts),
            });

            console.log(response);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }



    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            window.location.href = '/login'
        }
        fetchOrderData();
    }, []);

    return (
        <div className="flex justify-center items-center max-h-screen">
            <ViewOrderCard
                order={order}
                handleModifyOrder={handleModifyOrder}
                handleOrderStatus={handleOrderStatus}
                handleDeleteOrder={handleDeleteOrder}
                formatTimestamp={formatTimestamp}
                redirectToOrders={redirectToOrders}
            />
        </div>
    );
}