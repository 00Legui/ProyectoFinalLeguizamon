import mate1 from '../assets/images/mate1.webp';
import bombilla1 from '../assets/images/bombilla1.webp';
import set1 from '../assets/images/set1.webp';
import mate2 from '../assets/images/mate2.webp';

const products = [
  {
    id: '1',
    title: "Mate Imperial",
    price: 15000,
    description: "Mate de calabaza premium con detalles en alpaca",
    imageUrl: mate1,
    category: "mates",
    stock: 5
  },
  {
    id: '2',
    title: "Bombilla Alpaca",
    price: 8000,
    description: "Bombilla artesanal premium",
    imageUrl: bombilla1,
    category: "bombillas",
    stock: 10
  },
  {
    id: '3',
    title: "Set Matero Completo",
    price: 25000,
    description: "Kit completo premium",
    imageUrl: set1,
    category: "sets",
    stock: 3
  },
  {
    id: '4',
    title: "Mate Camionero",
    price: 12000,
    description: "Mate de madera forrado en cuero",
    imageUrl: mate2,
    category: "mates",
    stock: 8
  }
];
  
  export const getProducts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 500);
    });
  };
  
  export const getProductById = (productId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = products.find(prod => prod.id === productId);
        resolve(product);
      }, 500);
    });
  };
  
  export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredProducts = products.filter(prod => prod.category === categoryId);
        resolve(filteredProducts);
      }, 500);
    });
  };