// * react
import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>
                Корзина пустая <span>😕</span>
            </h2>
            <p>
                Вероятней всего, вы не заказывали ещё блюда.
                <br />
                Для того, чтобы заказать блюдо, перейди на главную страницу.
            </p>
            <img src='./img/empty-cart.png' alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>
                    Вернуться назад
                </span>
            </Link>
        </div>
    )
};

export default CartEmpty