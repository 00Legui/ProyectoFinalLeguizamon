import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../services/firebase';
import ItemList from '../ItemList/ItemList';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    console.log("Iniciando carga de productos..."); // Debug log

    const fetchProducts = async () => {
      try {
        const data = categoryId 
          ? await getProductsByCategory(categoryId)
          : await getProducts();
        console.log("Productos cargados:", data); // Debug log
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    console.log("Estado: Cargando..."); // Debug log
    return <div className="loading">Cargando productos...</div>;
  }

  if (products.length === 0) {
    console.log("Estado: No hay productos"); // Debug log
    return <div>No hay productos disponibles</div>;
  }

  console.log("Estado: Renderizando productos", products); // Debug log
  return (
    <div className="item-list-container">
      <h2>Nuestros Productos</h2>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;