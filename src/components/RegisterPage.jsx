import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Використовуємо стиль логіну

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegisterError(null);

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            password
        };

        try {
            await dispatch(register(userData));
            setIsRegistered(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Registration failed:", error);
            setRegisterError("Помилка під час реєстрації. Переконайтеся, що всі дані введені правильно.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Register</h2>
                {registerError && <div className="error-message">{registerError}</div>}
                {isRegistered && <div className="success-message">Реєстрація успішна! Перенаправлення...</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <div className="text-center mt-3">
                    <p>
                        Якщо є акаунт <a href="/login">Увійдіть</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
