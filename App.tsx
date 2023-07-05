import { View, StatusBar} from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Baloo2_400Regular } from '@expo-google-fonts/baloo-2';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { Theme } from './src/theme';
import { Routes } from '@routes/index';
import { CartContextProvider } from '@contexts/CartContext';
import { GestureHandlerRootView } from "react-native-gesture-handler"

import "react-native-gesture-handler"

export default function App() {

  const [fontsloaded] = useFonts({Roboto_400Regular, Roboto_700Bold, Baloo2_400Regular,})

  return (
    <NativeBaseProvider theme={Theme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <CartContextProvider>
          {fontsloaded ? <Routes /> : <Loading />}
        </CartContextProvider>

        <StatusBar
          barStyle="light-content"
          backgroundColor="#272221"
          translucent
        />
      </GestureHandlerRootView>
    </NativeBaseProvider>    
  );
}