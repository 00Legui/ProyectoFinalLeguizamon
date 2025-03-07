import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const LoadProducts = () => {
    const productos = [
        {
            title: "Remera Oversize",
            price: 15000,
            stock: 10,
            categoria: "remeras",
            description: "Remera oversize de algodón premium",
            imageUrl: "https://acdn.mitiendanube.com/stores/001/160/839/products/remera-oversize-negra1-7c8b3ea8c7e3f0c91216595382560437-1024-1024.jpg"
        },
        {
            title: "Pantalón Cargo",
            price: 25000,
            stock: 8,
            categoria: "pantalones",
            description: "Pantalón cargo con bolsillos laterales",
            imageUrl: "https://acdn.mitiendanube.com/stores/001/160/839/products/cargo-negro21-68d7f9a6e9b3f1c96416595369466595-1024-1024.jpg"
        },
        {
            title: "Buzo Hoodie",
            price: 30000,
            stock: 15,
            categoria: "buzos",
            description: "Buzo hoodie de algodón frisado",
            imageUrl: "https://acdn.mitiendanube.com/stores/001/160/839/products/buzo-hoodie-negro1-68e6e4e3e4c6b4c91216595375070595-1024-1024.jpg"
        }
    ];

    const handleCargarProductos = async () => {
        try {
            for (const producto of productos) {
                await addDoc(collection(db, "productos"), producto);
                console.log(`Producto ${producto.title} agregado correctamente`);
            }
            alert("Productos cargados exitosamente");
        } catch (error) {
            console.error("Error al cargar productos:", error);
            alert("Error al cargar productos");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Cargar Productos a Firebase</h2>
            <button onClick={handleCargarProductos}>
                Cargar Productos
            </button>
        </div>
    );
};

export default LoadProducts;