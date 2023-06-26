import { CoffeeData } from '@dtos/CoffeeDTO';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COFFEE_STORAGE } from './storageConfig';

import {coffeeData} from '../data/data'

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
  });


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