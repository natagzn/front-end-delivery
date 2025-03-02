import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
//import "./Navbar.css"; // Додай стилі при необхідності
import "./index.css";


const Navbar = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) return null;

    let role = null;
    if(token){
        try {
            role = jwtDecode(token)?.role || null;
        } catch (error) {
            console.error("Помилка декодування токена:", error);
            localStorage.removeItem("token");
            navigate("/login");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to="/" exact className="active">
                        Головна
                    </NavLink>
                </li>

                {role === "admin" ? (
                    <>
                        <li>
                            <NavLink to="/admin/goods" className="active">
                                Товари
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/orders" className="active">
                                Замовлення
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/delivery" className="active">
                                Доставка
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/status-delivery" className="active">
                                Статуси доставки
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/status-order" className="active">
                                Статуси замовлень
                            </NavLink>
                        </li>
                    </>
                ): (role === "user")?(
                    <>
                        <li>
                            <NavLink to="/orders" className="active">
                                Замовлення
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/goods" className="active">
                                Товари
                            </NavLink>
                        </li>
                    </>
                ):(
                    <>
                    <NavLink to={`/login`} exact className="active">Login</NavLink>
                    </>
                )}

                <li>
                    <button className="logout-btn" onClick={handleLogout}>Вийти</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
