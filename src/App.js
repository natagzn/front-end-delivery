import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Navbar from './Navbar'
import ProtectedRoute from "./ProtectedRoute";

import LoginPage  from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Home from "./components/Home";

import GoodsPage from './components/User/GoodsPage';
import OrderPage from './components/User/OrderPage';

import AdminGoodsPage from './components/Admin/AdminGoodsPage';
import AdminOrderPage from './components/Admin/AdminOrderPage';
import AdminDeliveryPage from "./components/Admin/AdminDeliveryPage";
import DeliveryStatusesPage from "./components/Admin/DeliveryStatusesPage";
import OrderStatusPage from "./components/Admin/OrderStatusPage";


function App() {
  return (
    <Provider store={store}>
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />


              <Route
                  path="/goods"
                  element={
                    <GoodsPage />
                  }
              />
              <Route
                  path="/orders"
                  element={
                      <OrderPage />
                  }
              />


                <Route
                    path="/admin/goods"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminGoodsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminOrderPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/delivery"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminDeliveryPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/status-delivery"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <DeliveryStatusesPage />
                        </ProtectedRoute>
                    }
                />
              <Route
                  path="/admin/status-order"
                  element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                          <OrderStatusPage />
                      </ProtectedRoute>
                  }
              />
            </Routes>
        </Router>
    </Provider>
  );
}

export default App;
