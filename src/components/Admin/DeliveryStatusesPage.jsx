import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatuses, addStatusDelivery, updateStatusDelivery, deleteStatusDelivery } from "../../redux/actions/deliveryStatusActions";
import 'bootstrap/dist/css/bootstrap.min.css';

const DeliveryStatusPage = () => {
    const dispatch = useDispatch();
    const { statuses } = useSelector((state) => state.deliveryStatus);

    const [showModal, setShowModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [formData, setFormData] = useState({ name: "" });

    useEffect(() => {
        dispatch(fetchStatuses());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Ви впевнені, що хочете видалити цей статус?")) {
            dispatch(deleteStatusDelivery(id)).then(() => {
                dispatch(fetchStatuses()); // Оновлення списку після видалення
            });
        }
    };

    const handleEdit = (status) => {
        setCurrentStatus(status);
        setFormData({ name: status.name});
        setShowModal(true);
    };

    const handleCreate = () => {
        setCurrentStatus(null);
        setFormData({ name: "" });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStatus) {
            dispatch(updateStatusDelivery(currentStatus._id, formData)).then(() => {
                dispatch(fetchStatuses()); // Оновлення списку після видалення
            });
        } else {
            dispatch(addStatusDelivery(formData)).then(() => {
                dispatch(fetchStatuses()); // Оновлення списку після видалення
            });
        }
        setShowModal(false);
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Статуси доставки</h2>
            <button
                className="btn btn-success mb-3 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                style={{ backgroundColor: "#e67e22", color: "#fff" }}
                onClick={handleCreate}>Створити статус</button>
            <div className="row">
                {statuses && statuses.length > 0 ? (
                    statuses.map((item) => (
                        <div key={item._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Змінити</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Видалити</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Статусів немає</p>
                )}
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentStatus ? "Редагувати статус" : "Створити статус"}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Назва</label>
                                        <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <button type="submit" className="btn btn-success">Зберегти</button>
                                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowModal(false)}>Скасувати</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryStatusPage;
