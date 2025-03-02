import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatuses, addStatusOrder, updateStatusOrder, deleteStatusOrder } from "../../redux/actions/orderStatusActions";
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderStatusPage = () => {
    const dispatch = useDispatch();
    const { statuses } = useSelector((state) => state.orderStatus);

    const [showModal, setShowModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [formData, setFormData] = useState({ name: "" });

    useEffect(() => {
        dispatch(fetchStatuses());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Ви впевнені, що хочете видалити цей статус?")) {
            dispatch(deleteStatusOrder(id)).then(() => {
                dispatch(fetchStatuses());
            });
        }
    };

    const handleEdit = (status) => {
        setCurrentStatus(status);
        setFormData({ name: status.name });
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
            dispatch(updateStatusOrder(currentStatus._id, formData)).then(() => {
                dispatch(fetchStatuses());
            });
        } else {
            dispatch(addStatusOrder(formData)).then(() => {
                dispatch(fetchStatuses());
            });
        }
        setShowModal(false);
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Статуси замовлень</h2>
            <button className="btn btn-success mb-3" onClick={handleCreate}>Створити статус</button>
            <div className="row">
                {statuses && statuses.length > 0 ? (
                    statuses.map((item) => (
                        <div key={item._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
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

export default OrderStatusPage;
