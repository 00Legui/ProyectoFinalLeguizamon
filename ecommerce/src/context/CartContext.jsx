import { createContext, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = async (item, quantity) => {
        if (!item.id) {
            console.error("El item no tiene ID");
            return;
        }

        try {
            // Verificar stock en Firebase
            const productRef = doc(db, "productos", item.id);
            const productSnap = await getDoc(productRef);
            
            if (!productSnap.exists()) {
                console.error("Producto no encontrado");
                return;
            }

            const currentStock = productSnap.data().stock;

            // Verificar si hay suficiente stock
            if (currentStock < quantity) {
                alert("No hay suficiente stock disponible");
                return;
            }

            // Verificar si el item ya está en el carrito
            const itemInCart = cart.find(prod => prod.id === item.id);

            if (itemInCart) {
                // Si el item ya está en el carrito, actualizar cantidad
                if (itemInCart.quantity + quantity > currentStock) {
                    alert("No hay suficiente stock disponible");
                    return;
                }

                setCart(cart.map(prod => 
                    prod.id === item.id 
                        ? { ...prod, quantity: prod.quantity + quantity }
                        : prod
                ));
            } else {
                // Si el item no está en el carrito, agregarlo
                setCart([...cart, { ...item, quantity }]);
            }

        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            alert("Error al agregar al carrito");
        }
    };

    const removeItem = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId);
    };

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addItem, 
            removeItem, 
            clearCart, 
            total,
            totalQuantity,
            isInCart 
        }}>
            {children}
        </CartContext.Provider>
    );
};