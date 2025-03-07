import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export const getProducts = async () => {
  try {
    console.log("Intentando obtener productos..."); // Debug log
    const productsRef = collection(db, "productos");
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Productos obtenidos:", products); // Debug log
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, "productos", productId);
    const snapshot = await getDoc(productRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    throw new Error("El producto no existe");
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const productsRef = collection(db, "productos");
    const q = query(productsRef, where("categoria", "==", categoryId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    throw error;
  }
};