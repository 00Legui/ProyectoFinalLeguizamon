import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ProductLoader = () => {
  const [status, setStatus] = useState('');

  const cargarProductos = async () => {
    const productos = [
      {
        title: "Producto 1",
        price: 1000,
        stock: 10,
        categoria: "categoria1",
        description: "Descripción del producto 1",
        imageUrl: "url-imagen-1"
      },
      // Agrega más productos aquí
    ];

    try {
      setStatus('Cargando productos...');
      for (const producto of productos) {
        await addDoc(collection(db, "productos"), producto);
      }
      setStatus('Productos cargados exitosamente');
    } catch (error) {
      setStatus('Error al cargar productos: ' + error.message);
    }
  };

  return (
    <div>
      <button onClick={cargarProductos}>Cargar Productos</button>
      <p>{status}</p>
    </div>
  );
};

export default ProductLoader;