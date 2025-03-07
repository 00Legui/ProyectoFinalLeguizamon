import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeItem, clearCart, total } = useContext(CartContext);

    const handleRemoveItem = async (itemId) => {
        try {
            await removeItem(itemId);
        } catch (error) {
            console.error("Error al remover item:", error);
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
        } catch (error) {
            console.error("Error al limpiar el carrito:", error);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Tu carrito está vacío</h2>
                <Link to="/" className="option">Productos</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            {cart.map(item => (
                <div key={item.id} className="cart-item">
                    <img src={item.imageUrl} alt={item.title} />
                    <div className="item-details">
                        <h3>{item.title}</h3>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio unitario: ${item.price}</p>
                        <p>Subtotal: ${item.price * item.quantity}</p>
                    </div>
                    <button 
                        onClick={() => handleRemoveItem(item.id)} 
                        className="remove-button"
                    >
                        X
                    </button>
                </div>
            ))}
            <div className="cart-footer">
                <h3>Total: ${total}</h3>
                <button 
                    onClick={handleClearCart} 
                    className="clear-button"
                >
                    Limpiar Carrito
                </button>
                <Link to="/checkout" className="checkout-button">
                    Checkout
                </Link>
            </div>
        </div>
    );
};

export default Cart;