import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods, addGoods, updateGoods, deleteGoods } from "../../redux/actions/goodsAction";
import 'bootstrap/dist/css/bootstrap.min.css';

const GoodsUser = () => {
    const dispatch = useDispatch();
    const { goods } = useSelector((state) => state.goods);

    const [showModal, setShowModal] = useState(false);
    const [currentGood, setCurrentGood] = useState(null);
    const [formData, setFormData] = useState({ name: "", price: "", count: "" });

    useEffect(() => {
        dispatch(fetchGoods());
    }, [dispatch]);


    const handleDelete = (id) => {
        if (window.confirm("Ви впевнені, що хочете видалити цей товар?")) {
            dispatch(deleteGoods(id));
        }
    };

    const handleEdit = (good) => {
        setCurrentGood(good);
        setFormData({ name: good.name, price: good.price, count: good.count });
        setShowModal(true);
    };

    const handleCreate = () => {
        setCurrentGood(null);
        setFormData({ name: "", price: "", count: "" });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentGood) {
            dispatch(updateGoods(currentGood._id, formData));
        } else {
            dispatch(addGoods(formData));
        }
        setShowModal(false);
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Товари</h2>
            <button
                className="btn btn-success mb-3 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                style={{ backgroundColor: "#e67e22", color: "#fff" }}
                onClick={handleCreate}>Створити товар</button>
            <div className="row">
                {goods.length > 0 ? (
                    goods.map((item) => (
                        <div key={item._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Ціна: {item.price} грн</p>
                                    <p className="card-text">Кількість: {item.count}</p>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Змінити</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Видалити</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Товарів немає</p>
                )}
            </div>

            {/* Модальне вікно для створення/редагування товару */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentGood ? "Редагувати товар" : "Створити товар"}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Назва</label>
                                        <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Ціна</label>
                                        <input type="number" className="form-control" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Кількість</label>
                                        <input type="number" className="form-control" value={formData.count} onChange={(e) => setFormData({ ...formData, count: e.target.value })} required />
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

export default GoodsUser;
