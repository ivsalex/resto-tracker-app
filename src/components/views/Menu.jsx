import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ProductsList from "../structure/Products/ProductList";
import MenuOrderCard from "../structure/Menu/MenuOrderCard";
import MenuCategoriesHeader from "../structure/Menu/MenuCategoriesHeader";
import Cookies from 'js-cookie';

export const Menu = () => {
    const { orderId } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Pizza");
    const [orderProducts, setOrderProducts] = useState([]);

    const navigate = useNavigate();

    const fetchProductsData = async () => {
        try {
            const response = await fetch('http://localhost:3001/products/', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get("token")
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProducts(data?.products);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const modifyOrder = async (orderProducts, orderId) => {
        try {
            const requestOrderBody = orderProducts.map((product) => {
                return (
                    {
                        product: {
                            _id: product._id,
                        },
                        quantity: product.quantity
                    }
                )
            });

            const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get("token")
                },
                body: JSON.stringify(requestOrderBody),
            });

            if (response.ok) {
                navigate(`/orders/view/${orderId}`);
            } else {
                console.error('Error modifying order:', response.status);
            }
        } catch (error) {
            console.error('Error modifying order:', error);
        }
    };

    const addToOrderTab = async (newProduct) => {
        try {
            const productIndex = orderProducts.findIndex((product) => product._id === newProduct._id);

            if (productIndex === -1) {
                newProduct.quantity = 1;
                newProduct.totalPrice = newProduct.price * newProduct.quantity;
                setOrderProducts((prevProducts) => [...prevProducts, newProduct]);
            }
        } catch (error) {
            console.error('Error adding product to order:', error);
        }
    };

    const incrementQuantity = async (product) => {
        const updatedProducts = orderProducts.map((actualProduct) => {
            if (product._id === actualProduct._id) {
                const newQuantity = Math.max(1, actualProduct.quantity + 1);
                const newTotalPrice = Math.max(0, actualProduct.price * newQuantity);

                return {
                    ...actualProduct,
                    quantity: newQuantity,
                    totalPrice: newTotalPrice
                };
            }
            return actualProduct;
        });
        setOrderProducts(updatedProducts);
    };

    const decrementQuantity = async (product) => {
        const updatedProducts = orderProducts.map((actualProduct) => {
            if (product._id === actualProduct._id) {
                const newQuantity = Math.max(0, actualProduct.quantity - 1);
                const newTotalPrice = Math.max(0, actualProduct.price * newQuantity);

                if (newQuantity === 0) {
                    return null;
                }

                return {
                    ...actualProduct,
                    quantity: newQuantity,
                    totalPrice: newTotalPrice
                };
            }
            return actualProduct;
        });
        const filteredProducts = updatedProducts.filter((product) => product !== null);
        setOrderProducts(filteredProducts);
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            window.location.href = '/login'
        }
        fetchProductsData();
    }, []);

    useEffect(() => {
        if (activeCategory === "All") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => product.type === activeCategory);
            setFilteredProducts(filtered);
        }
    }, [products, activeCategory]);

    return (
        <div className="bg-gray-100">
            <div className="lg:hidden">
                <div className="w-full">
                    <MenuCategoriesHeader
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        categories={["Offers", "Pizza", "Pasta", "Burgers", "Sides", "Desserts", "Drinks"]}
                    />
                    <ProductsList
                        filteredProducts={filteredProducts}
                        addToOrderTab={addToOrderTab}
                    />
                </div>
                <div className="w-full mt-4">
                    <MenuOrderCard
                        orderProducts={orderProducts}
                        decrementQuantity={decrementQuantity}
                        incrementQuantity={incrementQuantity}
                        modifyOrder={modifyOrder}
                    />
                </div>
            </div>

            <div className="hidden lg:flex">
                <div className="w-3/4">
                    <MenuCategoriesHeader
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        categories={["Offers", "Pizza", "Pasta", "Burgers", "Sides", "Desserts", "Drinks"]}
                    />
                    <ProductsList
                        filteredProducts={filteredProducts}
                        addToOrderTab={addToOrderTab}
                    />
                </div>
                <div className="w-1/4">
                    <MenuOrderCard
                        orderProducts={orderProducts}
                        decrementQuantity={decrementQuantity}
                        incrementQuantity={incrementQuantity}
                        modifyOrder={modifyOrder}
                    />
                </div>
            </div>
        </div>
    )
}