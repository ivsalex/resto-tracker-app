import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Products from "../pages/Products";
import Tables from "../pages/Tables";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import Orders from "../pages/Orders";

const Navigation = () => {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/" element={<Home />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders/modify/:orderId" element={<Menu />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders/view/:orderId" element={<Order />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation;
