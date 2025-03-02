import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Перевірка авторизації при завантаженні сторінки
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/"); // Якщо токен є — перекидаємо на головну
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(null); // Очистка попередньої помилки

        try {
            await dispatch(login(email, password));

            const token = localStorage.getItem("token");
            console.log("Token from localStorage:", token);

            if (token) {
                navigate("/");
            } else {
                setLoginError("Невірний email або пароль. Спробуйте ще раз.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setLoginError("Помилка під час входу. Переконайтеся, що дані введені правильно.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                {loginError && <div className="error-message">{loginError}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <div className="text-center mt-3">
                    <p>
                        Немає акаунту? <a href="/register">Зареєструватися</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
