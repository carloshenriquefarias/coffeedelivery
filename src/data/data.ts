import coffee from '@assets/coffee.png';
import Americano from '@assets/coffees/americano.png';
import Arabe from '@assets/coffees/arabe.png';
import Capuccino from '@assets/coffees/capuccino.png';
import Chocolate from '@assets/coffees/chocolate.png';
import Cremoso from '@assets/coffees/cremoso.png';
import Cubano from '@assets/coffees/cubano.png';
import Gelado from '@assets/coffees/gelado.png';
import Havaiano from '@assets/coffees/havaiano.png';
import Irlandes from '@assets/coffees/irlandes.png';
import Latte from '@assets/coffees/latte.png';
import Leite from '@assets/coffees/leite.png';
import Macchiato from '@assets/coffees/macchiato.png';
import Mocaccino from '@assets/coffees/mocaccino.png';
import Tradicional from '@assets/coffees/tradicional.png';

import { ImageSourcePropType} from 'react-native';
interface CoffeeData {
  id: string;
  tags: string;
  name: string;
  description: string;
  photo: ImageSourcePropType;
  price: string;
  onPress?: () => void;
}

export const coffeeData: CoffeeData[] = [
  {
    id: '1',
    tags: "Tradicional",
    name: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    photo: Tradicional,
    price: '9.89',
  },
  {
    id: '2',
    tags: "Tradicional",
    name: "Expresso Americano",
    description: "Expresso diluído, menos intenso que o tradicional",
    photo: Americano,
    price: '9.95',
  },
  {
    id: '3',
    tags: "Tradicional",
    name: "Expresso Cremoso",
    description: "Café expresso tradicional com espuma cremosa",
    photo: Cremoso,
    price: '9.99',
  },
  {
    id: '4',
    tags: "Tradicional",
    name: "Expresso Gelado",
    description: "Bebida preparada com café expresso e cubos de gelo",
    photo: Gelado,
    price: '9.45',
  },
  {
    id: '5',
    tags: "Tradicional",
    name: "Café com Leite",
    description: "Meio a meio de expresso tradicional com leite vaporizado",
    photo: Leite,
    price: '9.50',
  },
  {
    id: '6',
    tags: "Tradicional",
    name: "Latte",
    description: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
    photo: Latte,
    price: '9.60',
  },
  {
    id: '7',
    tags: "Tradicional",
    name: "Capuccino",
    description:
      "Bebida com canela feita de doses iguais de café, leite e espuma",
    photo: Capuccino,
    price: '9.80',
  },
  {
    id: '8',
    tags: "Doces",
    name: "Macchiato",
    description:
      "Café expresso misturado com um pouco de leite quente e espuma",
    photo: Macchiato,
    price: '9.75',
  },
  {
    id: '9',
    tags: "Doces",
    name: "Mocaccino",
    description: "Café expresso com calda de chocolate, pouco leite e espuma",
    photo: Mocaccino,
    price: '9.99',
  },
  {
    id: '10',
    tags: "Doces",
    name: "Chocolate Quente",
    description: "Bebida feita com chocolate dissolvido no leite quente e café",
    photo: Chocolate,
    price: '9.99',
  },
  {
    id: '11',
    tags: "Especial",
    name: "Cubano",
    description:
      "Drink gelado de café expresso com rum, creme de leite e hortelã",
      photo: Cubano,
      price: '9.95',
  },
  {
    id: '12',
    tags: "Especial",
    name: "Havaiano",
    description: "Bebida adocicada preparada com café e leite de coco",
    photo: Havaiano,
    price: '9.45',
  },
  {
    id: '13',
    tags: "Especial",
    name: "Árabe",
    description: "Bebida preparada com grãos de café árabe e especiarias",
    photo: Arabe,
    price: '9.25',
  },
  {
    id: '14',
    tags: "Especial",
    name: "Irlandês",
    description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
    photo: Irlandes,
    price: '9.50',
  },
];