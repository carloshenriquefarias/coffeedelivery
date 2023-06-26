import { ImageSourcePropType } from 'react-native';

export interface CoffeeData {
    id: string;
    tags: string;
    name: string;
    description: string;
    photo: ImageSourcePropType;
    price: string;
    onPress?: () => void;
}
  
