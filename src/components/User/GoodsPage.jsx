import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods } from "../../redux/actions/goodsAction";
import 'bootstrap/dist/css/bootstrap.min.css';

const GoodsUser = () => {
    const dispatch = useDispatch();
    const { goods } = useSelector((state) => state.goods);

    useEffect(() => {
        dispatch(fetchGoods());
    }, [dispatch]);

    const handleOrder = (goodsID) => {
        console.log(`Замовлення товару з ID: ${goodsID}`);
        // TODO: Реалізувати логіку створення замовлення
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Товари</h2>
            <div className="row">
                {goods.length > 0 ? (
                    goods.map((item) => (
                        <div key={item._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Ціна: {item.price} грн</p>
                                    <p className="card-text">Кількість: {item.count}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleOrder(item._id)}
                                    >
                                        Замовити
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Товарів немає</p>
                )}
            </div>
        </div>
    );
};

export default GoodsUser;
