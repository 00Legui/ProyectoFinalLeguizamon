import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { collection, addDoc, doc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './Checkout.css';

const Checkout = () => {
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const { cart, total, clearCart } = useContext(CartContext);
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        emailConfirm: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(formData.email !== formData.emailConfirm) {
            alert("Los emails no coinciden");
            return;
        }

        try {
            const batch = writeBatch(db);
            const outOfStock = [];

            // Verificar stock
            for (const item of cart) {
                const productRef = doc(db, "productos", item.id);
                const productSnap = await getDoc(productRef);
                
                if (productSnap.exists()) {
                    const currentStock = productSnap.data().stock;
                    if (currentStock >= item.quantity) {
                        batch.update(productRef, {
                            stock: currentStock - item.quantity
                        });
                    } else {
                        outOfStock.push(item);
                    }
                }
            }

            if (outOfStock.length > 0) {
                alert("Algunos productos no tienen suficiente stock");
                return;
            }

            // Crear orden
            const orden = {
                buyer: {
                    name: formData.nombre,
                    phone: formData.telefono,
                    email: formData.email
                },
                items: cart,
                total: total,
                date: new Date()
            };

            const docRef = await addDoc(collection(db, "ordenes"), orden);
            await batch.commit();
            
            setOrderId(docRef.id);
            clearCart();
            setFormData({
                nombre: '',
                telefono: '',
                email: '',
                emailConfirm: ''
            });

        } catch (error) {
            console.error("Error al procesar la orden:", error);
            alert("Error al procesar la orden");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Se está procesando su orden...</h2>;
    }

    if (orderId) {
        return (
            <div className="checkout-success">
                <h2>¡Gracias por tu compra!</h2>
                <p>Tu número de orden es: {orderId}</p>
                <button onClick={() => window.location.href = '/'}>
                    Volver a la tienda
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="emailConfirm">Confirmar Email</label>
                    <input
                        type="email"
                        id="emailConfirm"
                        name="emailConfirm"
                        value={formData.emailConfirm}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    className="checkout-button"
                    disabled={!cart.length}
                >
                    Finalizar Compra
                </button>
            </form>
        </div>
    );
};

export default Checkout;