import React, { useState, useEffect } from "react";
import ProductsList from "../structure/Products/ProductList";
import MenuCategoriesHeader from "../structure/Menu/MenuCategoriesHeader";
import Cookies from 'js-cookie';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Pizza");

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
                    <MenuCategoriesHeader activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={["Offers", "Pizza", "Pasta", "Burgers", "Sides", "Desserts", "Drinks"]} />
                    <ProductsList filteredProducts={filteredProducts} />
                </div>
            </div>

            <div className="hidden lg:flex">
                <div className="w-full">
                    <MenuCategoriesHeader activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={["Offers", "Pizza", "Pasta", "Burgers", "Sides", "Desserts", "Drinks"]} />
                    <ProductsList filteredProducts={filteredProducts} />
                </div>
            </div>
        </div>
    )
}