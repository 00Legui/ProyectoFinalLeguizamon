import { Link } from 'react-router-dom';
import './ItemList.css';

const ItemList = ({ products }) => {
  return (
    <div className="item-list">
      {products.map(product => (
        <div key={product.id} className="item-card">
          <img src={product.imageUrl} alt={product.title} className="item-image" />
          <h3>{product.title}</h3>
          <p className="price">$ {product.price}</p>
          <Link to={`/item/${product.id}`} className="view-detail-btn">
            Ver Detalle
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ItemList;