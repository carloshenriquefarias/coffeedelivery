import { createContext, useState, ReactNode, useEffect } from 'react';
import { CoffeeData } from '@dtos/CoffeeDTO'
import { StorageCartProps, 
  storageProductSave, 
  storageProductRemove, 
  storageProductGetAll, 
  storageAddItem,
  storageRemoveItem
} from '../storage/storageCoffee';

export type CartContextDataProps = {
  addProductCart: (newProduct: StorageCartProps) => Promise<void>;
  removeProductCart: (productId: string) => Promise<void>;
  cart: StorageCartProps[];
  addItemProductCart: (productId: string) => Promise<void>;
  removeItemProductCart: (productId: string) => Promise<void>;
}

type CartContextProviderProps = {
  children: ReactNode;
}

export interface CartItem extends CoffeeData {
  quantity: number;
}

export const CartContext = createContext<CartContextDataProps>({} as CartContextDataProps);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<StorageCartProps[]>([]);

  async function addProductCart(newProduct: StorageCartProps) {
    try {
      const storageResponse = await storageProductSave(newProduct);
      
      setCart(storageResponse);
    } catch (error) {
      throw error;
    }
  }

  async function removeProductCart(productId: string) {
    try {
      const response = await storageProductRemove(productId);
      setCart(response);
    } catch (error) {
      throw error;
    }
  }

  async function addItemProductCart(productId: string) {
    try {
      const response = await storageAddItem(productId);
      setCart(response);
    } catch (error) {
      throw error;
    }
  }

  async function removeItemProductCart(productId: string) {
    try {
      const response = await storageRemoveItem(productId);
      setCart(response);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    storageProductGetAll()
      .then(products => setCart(products))
      .catch(error => console.log(error));
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      addProductCart,
      removeProductCart,
      addItemProductCart,
      removeItemProductCart
    }}>
      {children}
    </CartContext.Provider>
  )
}