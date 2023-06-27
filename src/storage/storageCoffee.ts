import AsyncStorage from '@react-native-async-storage/async-storage';

import { coffeeData} from '../data/data'
import { CoffeeData } from '@dtos/CoffeeDTO';
import { COFFEE_STORAGE } from './storageConfig';
import { ImageSourcePropType } from 'react-native';

const coffeeDataString = JSON.stringify(coffeeData);

AsyncStorage.setItem('coffeeData', coffeeDataString)
  .then(() => {
    console.log('Dados armazenados com sucesso!');
  })
  .catch(error => {
    console.log('Erro ao armazenar os dados:', error);
});

AsyncStorage.getItem('coffeeData')
  .then(value => {
    if (value !== null) {
      const coffeeData = JSON.parse(value);
      console.log('Dados recuperados:', coffeeData);
    }
  })
  .catch(error => {
    console.log('Erro ao recuperar os dados:', error);
  })
;

export async function storageCoffeeSave(coffeeData: CoffeeData) {
  await AsyncStorage.setItem('coffeeData', coffeeDataString);
  console.log('Dados armazenados com sucesso!');
}

export async function storageCoffeeGet() {
  const storage = await AsyncStorage.getItem('coffeeData');

  const coffee = storage ? (JSON.parse(storage) as CoffeeData) : undefined;

  return coffee;
}

export async function storageCoffeeRemove() { 
  await AsyncStorage.removeItem(COFFEE_STORAGE);
}

const CART_STORAGE = '@IGNITESHOES_CART';

export type StorageCartProps = {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: string;
  photo: ImageSourcePropType;
}

export async function storageProductGetAll() {
  try {
    const storage = await AsyncStorage.getItem(CART_STORAGE);
    const products: StorageCartProps[] = storage ? JSON.parse(storage) : [];
    return products;

  } catch (error) {
    throw error;
  }
}

export async function storageProductSave(newProduct: StorageCartProps) {
  try {
    let products = await storageProductGetAll();
    const productExists = products.filter(product => product.id === newProduct.id);

    if (productExists.length > 0) {
      products = products.map(product => {
        if (product.id === newProduct.id) {
          product.quantity = (Number(product.quantity) + Number(newProduct.quantity));
        }
        return product;
      });
    } else {
      products.push(newProduct);
    }

    const productsUpdated = JSON.stringify(products);
    await AsyncStorage.setItem(CART_STORAGE, productsUpdated);

    return products;
  } catch (error) {
    throw error;
  }
}

export async function storageProductRemove(productId: string) {
  try {

    const products = await storageProductGetAll();
    const productsUpdated = products.filter(product => product.id !== productId);
    await AsyncStorage.setItem(CART_STORAGE, JSON.stringify(productsUpdated));

    return productsUpdated;

  } catch (error) {
    throw error;
  }
}