import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { processColor } from 'react-native';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const cartProducts = await AsyncStorage.getItem(
        '@GoMarketplace:cart-products',
      );

      if (cartProducts) {
        setProducts(JSON.parse(cartProducts));
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      const itemIndex = products.findIndex(prod => prod.id === product.id);
      let item;
      if (itemIndex > -1) {
        const newProducts = products.filter(item => item.id !== product.id);
        item = products[itemIndex];

        item.quantity += 1;

        setProducts([item, ...newProducts]);

        await AsyncStorage.setItem(
          '@GoMarketplace:cart-products',
          JSON.stringify([item, ...newProducts]),
        );
      } else {
        item = {
          ...product,
          quantity: 1,
        };
        setProducts([item, ...products]);

        await AsyncStorage.setItem(
          '@GoMarketplace:cart-products',
          JSON.stringify([item, ...products]),
        );
      }
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const product = products.find(prod => prod.id === id);
      const otherProducts = products.filter(prod => prod.id !== id);

      if (product !== undefined) {
        product.quantity += 1;

        setProducts([product, ...otherProducts]);
        await AsyncStorage.setItem(
          '@GoMarketplace:cart-products',
          JSON.stringify([product, ...otherProducts]),
        );
      }
      console.log(products);
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const product = products.find(prod => prod.id === id);
      const otherProducts = products.filter(prod => prod.id !== id);

      if (product !== undefined) {
        product.quantity -= 1;

        if (product.quantity > 0) {
          setProducts([product, ...otherProducts]);
          await AsyncStorage.setItem(
            '@GoMarketplace:cart-products',
            JSON.stringify([product, ...otherProducts]),
          );
        } else {
          setProducts([...otherProducts]);
          await AsyncStorage.setItem(
            '@GoMarketplace:cart-products',
            JSON.stringify([...otherProducts]),
          );
        }
      }
      console.log(products);
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
