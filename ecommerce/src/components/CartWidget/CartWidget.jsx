import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import './CartWidget.css';

const CartWidget = () => {
    const { cart } = useContext(CartContext);
    
    // Calcular cantidad total de items
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <Link to="/cart" className="cart-widget">
            <FaShoppingCart className="cart-icon" />
            {totalQuantity > 0 && <span className="cart-quantity">{totalQuantity}</span>}
        </Link>
    );
};

export default CartWidget;