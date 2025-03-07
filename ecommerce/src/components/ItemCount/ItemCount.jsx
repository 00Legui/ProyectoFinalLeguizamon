import { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock = 0, initial = 1, onAdd }) => {
    const [count, setCount] = useState(initial);

    const increment = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    return (
        <div className="counter">
            <div className="controls">
                <button 
                    className="button" 
                    onClick={decrement}
                    disabled={count <= 1}
                >
                    -
                </button>
                <h4 className="number">{count}</h4>
                <button 
                    className="button" 
                    onClick={increment}
                    disabled={count >= stock}
                >
                    +
                </button>
            </div>
            <div>
                <button 
                    className="button-add" 
                    onClick={() => onAdd(count)}
                    disabled={!stock || count > stock}
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default ItemCount;