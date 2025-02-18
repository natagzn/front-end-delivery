import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employer'); // За замовчуванням роль - працедавець
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password,
                role,
            });

            const { token } = response.data;

            // Зберігаємо токен у localStorage
            localStorage.setItem('token', token);

            alert('Login successful!');

            // Перенаправляємо на відповідну сторінку залежно від ролі
            if (role === 'employer') {
              navigate('/employers'); // Сторінка для працедавця
          } else if (role === 'candidate') {
              navigate('/candidates'); // Сторінка для кандидата
          }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid credentials!');
        }
    };

    return (
        <div>
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: '10px', margin: '10px 0', width: '250px' }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '10px', margin: '10px 0', width: '250px' }}
            />
            <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                style={{ padding: '10px', margin: '10px 0', width: '250px' }}
            >
                <option value="employer">Employer</option>
                <option value="candidate">Candidate</option>
            </select>
            <button 
                onClick={handleLogin} 
                style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '250px', marginTop: '10px' }}
            >
                Login
            </button>
        </div>
    </div>
    );
};

export default LoginPage;
