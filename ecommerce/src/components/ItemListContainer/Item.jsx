import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Item.css';

const Item = ({ id, title, price, imageUrl, description }) => {
  return (
    <div className="item-card">
      <img src={imageUrl} alt={title} className="item-image" />
      <div className="item-info">
        <h3 className="item-title">{title}</h3>
        <p className="item-description">{description}</p>
        <p className="item-price">${price}</p>
        <div className="item-buttons">
          <Link to={`/item/${id}`} className="item-button-detail">
            Ver detalle
          </Link>
          <button className="item-button-cart">
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;