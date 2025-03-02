import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder, updateOrder } from "../../redux/actions/orderActions";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../table.css';


import { updateOrderStatus } from '../../redux/actions/orderActions';
import { fetchStatuses } from '../../redux/actions/orderStatusActions';

const AdminOrderPage = () => {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState('');

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

    console.log("Orders from Redux:", orders);
    console.log("Statuses: ", statuses);

    if (loading) return <h2 className="text-center text-blue-500">Завантаження...</h2>;
    if (error) return <h2 className="text-center text-red-500">Помилка: {error}</h2>;

    const handleEdit = async (orderId) => {
        const newStatusId = selectedStatus[orderId];
        if (newStatusId) {
            await dispatch(updateOrderStatus(orderId, newStatusId)); // Виконання запиту на оновлення статусу
            dispatch(fetchOrders()); // Оновлення замовлень після зміни статусу
        }
    };

    const handleStatusChange = (orderId, newStatusId) => {
        setSelectedStatus((prev) => ({
            ...prev,
            [orderId]: newStatusId,
        }));
    };

    const handleDelete = (orderId) => {
        console.log("Видалення замовлення:", orderId);
        dispatch(deleteOrder(orderId)); // Виклик видалення
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📦 Список замовлень</h2>

            {orders.length === 0 ? (
                <p className="text-gray-500">❌ Немає замовлень.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-3 px-4">№</th>
                            <th className="py-3 px-4">Користувач</th>
                            <th className="py-3 px-4">Статус</th>
                            <th className="py-3 px-4">Товар</th>
                            <th className="py-3 px-4">Дата створення</th>
                            <th className="py-3 px-4"></th>
                            <th className="py-3 px-4"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id} className="border-t hover:bg-gray-50">
                                <td className="py-3 px-4">{order?._id || 'null'}</td>
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
                                        style={{ backgroundColor: "#966FD6", color: "#fff" }}
                                        onClick={() => handleEdit(order._id)}
                                    >
                                        Зберегти
                                    </button>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                        style={{ backgroundColor: "#966FD6", color: "#fff" }}
                                        onClick={() => handleDelete(order._id)}
                                    >
                                        Видалити
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
