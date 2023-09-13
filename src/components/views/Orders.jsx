import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import OrdersList from "../structure/Orders/OrdersList";

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrdersData = async () => {
        try {
            const response = await fetch('http://localhost:3001/orders/', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get("token")
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setOrders(data?.orders);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const redirectToOrder = (orderId) => {
        navigate(`/orders/view/${orderId}`);
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            window.location.href = '/login'
        }
        fetchOrdersData();
    }, []);

    return (
        <OrdersList orders={orders} redirectToOrder={redirectToOrder} fetchOrdersData={fetchOrdersData} />
    )
}