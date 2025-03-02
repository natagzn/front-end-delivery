import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeliveries, updateDeliveryStatus } from '../../redux/actions/deliveryActions';
import '../../table.css';
import { fetchStatuses } from "../../redux/actions/deliveryStatusActions";

const AdminDeliveryPage = () => {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState({});

    const deliveries = useSelector((state) => state.delivery.deliveries || []);
    const loading = useSelector((state) => state.delivery.loading);
    const error = useSelector((state) => state.delivery.error);

    const statusesState = useSelector((state) => state.deliveryStatus) ?? {};
    const { statuses = [] } = statusesState;
    console.log("statussState", statuses);

    let load = true;

    useEffect(() => {
        dispatch(fetchDeliveries());
        dispatch(fetchStatuses());
    }, [dispatch]);


    useEffect(() => {
        if (deliveries.length) {
            const initialSelectedStatus = {};
            deliveries.forEach(delivery => {
                initialSelectedStatus[delivery._id] = delivery.status_delivery_id;
            });
            setSelectedStatus(initialSelectedStatus);
        }
    }, [deliveries]);

    if (loading) {
        return <div className="text-center py-4">Завантаження...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-4">Помилка: {error}</div>;
    }

    const handleStatusChange = (deliveryId, newStatusId) => {
        setSelectedStatus((prev) => ({
            ...prev,
            [deliveryId]: newStatusId,
        }));
    };

    const handleEdit = async (deliveryId) => {
        const newStatusId = selectedStatus[deliveryId];
        if (newStatusId) {
            await dispatch(updateDeliveryStatus(deliveryId, newStatusId));
            dispatch(fetchDeliveries());
        }
    };

    return (
        <div className="container">
            <h2>🚚 Доставка</h2>

            {deliveries.length === 0 ? (
                <p className="text-gray-500 text-center">❌ Немає перевезень</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="bg-white shadow-md rounded-lg">
                        <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="py-3 px-4 border-b">ID</th>
                            <th className="py-3 px-4 border-b">ID Замовлення</th>
                            <th className="py-3 px-4 border-b">Статус</th>
                            <th className="py-3 px-4 border-b">Дата</th>
                            <th className="py-3 px-4 border-b">Останнє оновлення</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deliveries.map((delivery) => (
                            <tr key={delivery._id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{delivery._id}</td>
                                <td className="py-3 px-4">{delivery.order_id}</td>
                                <td>
                                    <select
                                        className="py-1 px-2 border rounded"
                                        value={selectedStatus[delivery._id] ?? delivery.status_delivery_id}
                                        onChange={(e) => handleStatusChange(delivery._id, e.target.value)}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status._id} value={status._id}>
                                                {status.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-3 px-4">{new Date(delivery.created_at).toLocaleString()}</td>
                                <td className="py-3 px-4">{new Date(delivery.departure_date).toLocaleString()}</td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                        style={{ backgroundColor: "#966FD6", color: "#fff" }}
                                        onClick={() => handleEdit(delivery._id)}
                                    >
                                        Зберегти зміни
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

export default AdminDeliveryPage;
