import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataProps, DietVariant, Meal } from '@screens/Home';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Order: {coffee_id: string};
  OrderFinished: undefined;
  // Feedback: { variant: DietVariant };
  // Meal: { meal: Meal };
  // EditMeal: { meal: Meal };
};

// type AppRoutes = {
//   home: undefined;
//   cart: {coffee_id: string};
//   order: {coffee_id: string};
//   orderFinished: undefined;
// }

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
