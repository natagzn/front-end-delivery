import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeliveries, updateDeliveryStatus } from '../../redux/actions/deliveryActions';
import '../../table.css';
import { fetchStatuses } from "../../redux/actions/deliveryStatusActions";

const AdminDeliveryPage = () => {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const deliveries = useSelector((state) => state.delivery.deliveries || []);
    const loading = useSelector((state) => state.delivery.loading);
    const error = useSelector((state) => state.delivery.error);

    const statusesState = useSelector((state) => state.deliveryStatus) ?? {};
    const { statuses = [] } = statusesState;

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

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (field) => {
        const order = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(field);
        setSortOrder(order);
    };

    const filteredDeliveries = deliveries.filter(delivery =>
        delivery._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedDeliveries = [...filteredDeliveries].sort((a, b) => {
        if (!sortBy) return 0;
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className="container">
            <h2>🚚 Доставка</h2>
            <input
                type="text"
                placeholder="Пошук за ID або статусом"
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
            />
            {filteredDeliveries.length === 0 ? (
                <p className="text-gray-500 text-center">❌ Немає перевезень</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                        <tr>
                            <th onClick={() => handleSort('_id')}>ID доставки ⬍</th>
                            <th onClick={() => handleSort('order_id')}>ID замовлення ⬍</th>
                            <th>Статус</th>
                            <th onClick={() => handleSort('created_at')}>Створено ⬍</th>
                            <th onClick={() => handleSort('departure_date')}>Оновлено ⬍</th>
                            <th>Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedDeliveries.map((delivery) => (
                            <tr key={delivery._id} className="border-b hover:bg-gray-50">
                                <td>{delivery._id}</td>
                                <td>{delivery.order_id}</td>
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
                                <td>{new Date(delivery.created_at).toLocaleDateString()}</td>
                                <td>{new Date(delivery.departure_date).toLocaleDateString()}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEdit(delivery._id)}
                                    >
                                        Зберегти
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
