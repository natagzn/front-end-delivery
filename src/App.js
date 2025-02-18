import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginPage  from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import GoodsPage from './components/User/GoodsPage';
import AdminGoodsPage from './components/Admin/AdminGoodsPage';
import AdminOrderPage from './components/Admin/AdminOrderPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                {/* 
                <Route
                    path="/employers"
                    element={
                        <ProtectedRoute>
                            <EmployerPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/candidates"
                    element={
                        <ProtectedRoute>
                            <CandidatesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedRoute>
                            <RegisterPage />
                        </ProtectedRoute>
                    }
                />
                */}
                 <Route
                    path="/goods"
                    element={
                     <GoodsPage />
                    }
                />
                <Route
                    path="/admin/goods"
                    element={
                     <AdminGoodsPage />
                    }
                />
                <Route
                    path="/admin/orders"
                    element={
                        <AdminOrderPage />
                    }
                />
            </Routes>
        </Router>
    </Provider>
  );
}

export default App;
