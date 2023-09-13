import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../elements/Button";
import { useAuth } from "../../contexts/AuthProvider";
import Cookies from 'js-cookie';

export const Dashboard = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [user, setUser] = useState({});

    const getUser = () => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser(payload);
                setAuth(payload);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
        return null;
    }

    const logout = () => {
        Cookies.remove('token');
        setAuth(null);

        window.location.href = '/';
    };

    useEffect(() => {
        const token = Cookies.get('token');
        getUser();
        if (!token) {
            navigate('/');
        }
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md">
                <div className="p-2 text-lg m-4">
                    <h1 className="text-2xl font-semibold">User Profile</h1>
                    <div className="mt-4">
                        <div className="mb-2">
                            <span className="text-gray-600">Email:</span>
                            <span className="ml-2 font-bold">{user?.email}</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-gray-600">Name:</span>
                            <span className="ml-2 font-bold">{user?.name}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">Role:</span>
                            <span className="ml-2 font-bold">{user?.role}</span>
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => logout()}
                    className="mt-4 px-4 py-2 text-black focus:outline-none"
                    variant="primary"
                >
                    Log out
                </Button>
            </div>
        </div>
    )
}