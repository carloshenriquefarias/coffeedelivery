import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/@types/navigation';
import { Cart } from '@screens/Cart';
import { Home } from '@screens/Home';
import { Order } from '@screens/Order';
import { OrderFinished } from '@screens/OrderFinished';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Home' component={Home} />
      <Screen name='Cart' component={Cart} />
      <Screen name='Order' component={Order} />
      <Screen name='OrderFinished' component={OrderFinished} />
    </Navigator>
  );
}
