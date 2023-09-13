import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablesList from "../structure/Tables/TablesList";
import Cookies from 'js-cookie';

export const Tables = () => {
    const [tables, setTables] = useState([]);
    const navigate = useNavigate();

    const fetchTablesData = async () => {
        try {
            const response = await fetch('http://localhost:3001/tables/', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('token')
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setTables(data?.tables);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const createOrder = async (tableId) => {
        try {
            const requestBody = {
                tableId: tableId
            };
            const response = await fetch('http://localhost:3001/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get("token")
                },
                body: JSON.stringify(requestBody),
            });
            const orderData = await response.json();
            return orderData;
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const validateOrder = async (tableId) => {
        try {
            const response = await fetch(`http://localhost:3001/tables/${tableId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get("token")
                }
            });
            const tableData = await response.json();

            if (!tableData.isAvailable) {
                console.log('This table is not available!');
                return false;
            }

            return true;
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    }

    const redirectToOrder = (orderId) => {
        navigate(`/orders/modify/${orderId}`);
    };

    const handleSubmit = async (tableId) => {
        try {
            if (validateOrder === false) {
                console.log('The table is not available!')
                return false;
            }
            const orderResult = await createOrder(tableId);
            if (orderResult && orderResult?.order._id !== undefined) {
                redirectToOrder(orderResult?.order?._id);
                return orderResult;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    }

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            window.location.href = '/login'
        }
        fetchTablesData();
    }, []);

    return (
        <TablesList tables={tables} handleSubmit={handleSubmit} />
    )
}