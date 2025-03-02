import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder, updateOrder } from "../../redux/actions/orderActions";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../table.css';

import { updateOrderStatus } from '../../redux/actions/orderActions';
import { fetchStatuses } from '../../redux/actions/orderStatusActions';

import {addDelivery} from '../../redux/actions/deliveryActions';

const AdminOrderPage = () => {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('userName');

    const ordersState = useSelector((state) => state.orders) ?? {};
    const { orders = [], loading, error } = ordersState;

    const statusesState = useSelector((state) => state.orderStatus) ?? {};
    const { statuses = [] } = statusesState;

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchStatuses());
    }, [dispatch]);

    useEffect(() => {
        const initialSelectedStatus = {};
        orders.forEach(order => {
            initialSelectedStatus[order._id] = order.status_id;
        });
        setSelectedStatus(initialSelectedStatus);
    }, [orders]);

    const handleEdit = async (orderId) => {
        const newStatusId = selectedStatus[orderId];
        if (newStatusId) {
            await dispatch(updateOrderStatus(orderId, newStatusId));
            dispatch(fetchOrders());
        }
    };

    const handleStatusChange = (orderId, newStatusId) => {
        setSelectedStatus((prev) => ({
            ...prev,
            [orderId]: newStatusId,
        }));
    };

    const handleDelete = (orderId) => {
        dispatch(deleteOrder(orderId));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (field) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortField(field);
    };

    const filteredOrders = orders.filter(order =>
        (order.userName && order.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.status && order.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order._id && order._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.goodsName && order.goodsName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortField] > b[sortField] ? 1 : -1;
        } else {
            return a[sortField] < b[sortField] ? 1 : -1;
        }
    });

    const handleCreateDelivery = async (order) => {
        const deliveryData = {
            order_id: order._id
        };
        await dispatch(addDelivery(deliveryData));
        alert(`Доставка для замовлення ${order._id} створена!`);
    };


    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📦 Список замовлень</h2>
            <input
                type="text"
                placeholder="🔍 Пошук за іменем користувача..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border rounded w-full"
            />
            {sortedOrders.length === 0 ? (
                <p className="text-gray-500">❌ Немає замовлень.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-3 px-4">ID Замовлення</th>
                            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('userName')}>Користувач ⬍</th>
                            <th className="py-3 px-4">Статус</th>
                            <th className="py-3 px-4">Товар</th>
                            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('created_at')}>Дата створення ⬍</th>
                            <th className="py-3 px-4"></th>
                            <th className="py-3 px-4"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedOrders.map((order) => (
                            <tr key={order._id} className="border-t hover:bg-gray-50">
                                <td className="py-3 px-4">{order?._id || 'оновлення...'}</td>
                                <td className="py-3 px-4">{order?.userName || 'оновлення...'}</td>
                                <td className="py-3 px-4">
                                    <select
                                        className="py-1 px-2 border rounded"
                                        value={selectedStatus[order._id] ?? order.status_id}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status._id} value={status._id}>
                                                {status.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-3 px-4">{order?.goodsName || "оновлення..."}</td>
                                <td className="py-3 px-4">
                                    {order?.created_at ? new Date(order.created_at).toLocaleDateString() : "—"}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                        style={{ backgroundColor: "#e67e22" }}
                                        onClick={() => handleEdit(order._id)}
                                    >
                                        Зберегти
                                    </button>
                                </td>

                                <td className="py-3 px-4 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                        style={{ backgroundColor: "#e67e22" }}
                                        onClick={() => handleCreateDelivery(order)}
                                    >
                                        Доставити
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrderPage;
