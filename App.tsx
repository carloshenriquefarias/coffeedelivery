import { Text, View, StatusBar} from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Baloo2_400Regular } from '@expo-google-fonts/baloo-2';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { Theme } from './src/theme';
import { Home } from '@screens/Home';
import { Order } from '@screens/Order';
import { Cart } from '@screens/Cart';

export default function App() {

  const [fontsloaded] = useFonts({Roboto_400Regular, Roboto_700Bold, Baloo2_400Regular,})

  return (
    <NativeBaseProvider theme={Theme}>
      <View style={{flex: 1}}>
        { fontsloaded ? <Cart/> : <Loading/>}

        <StatusBar
          barStyle="light-content"
          backgroundColor="#272221"
          translucent
        />
      </View>
    </NativeBaseProvider>    
  );
}