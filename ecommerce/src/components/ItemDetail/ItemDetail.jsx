import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const { addItem } = useContext(CartContext);

    const handleOnAdd = async (quantity) => {
        if (!product) {
            console.error("No hay producto para agregar");
            return;
        }

        try {
            await addItem(product, quantity);
            setQuantityAdded(quantity);
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            alert("No se pudo agregar el producto al carrito");
        }
    };

    if (!product) return <div>Cargando...</div>;

    return (
        <div className="item-detail">
            <div className="item-detail-image">
                <img src={product.imageUrl} alt={product.title} />
            </div>
            <div className="item-detail-info">
                <h2>{product.title}</h2>
                <p className="description">{product.description}</p>
                <p className="price">$ {product.price}</p>
                <p className="stock">Stock disponible: {product.stock}</p>
                
                {quantityAdded > 0 ? (
                    <Link to="/cart" className="finish-button">
                        Terminar compra
                    </Link>
                ) : (
                    <ItemCount 
                        initial={1} 
                        stock={product.stock} 
                        onAdd={handleOnAdd}
                    />
                )}
            </div>
        </div>
    );
};

export default ItemDetail;