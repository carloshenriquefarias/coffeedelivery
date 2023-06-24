import {Box, FlatList, HStack, ScrollView, Stack, StatusBar, Text, VStack, 
  useTheme, SectionList, Pressable, IconButton, Center, Input} from 'native-base'
;
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { InputSearch } from '@components/InputSearch';
import { Header } from '@components/Header';
import { TypeCoffee } from '@components/TypeCoffe';
import { useState } from 'react';
import { BoxCondition } from '@components/BoxCondition';
import { SafeAreaView } from 'react-native';
import { CardCoffee } from '@components/CardCoffee';
import { Loading } from '@components/Loading';

import { americano } from 'public/coffees/americano.png';
import { ArrowRight, Plus, Tag, Minus, ShoppingCart, ArrowLeft} from 'phosphor-react-native';
import { Images } from '@components/Image';
import { coffee } from '@assets/coffee.png';
import { ButtonDefault } from '@components/Button';
import { ItemCart } from '@components/ItemCart';

import { RootStackScreenProps } from 'src/@types/navigation';

export function OrderFinished({ navigation }: RootStackScreenProps<'OrderFinished'>){
  const {colors, sizes} = useTheme();
  const [loading, setLoading] = useState(false)
  const photo = 'https://github.com/carloshenriquefarias.png'

  function handleGoBackToHome() {
    // setLoading(true)
    navigation.navigate('Home');
    setLoading(false)
  }

  return(
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <VStack flex={1}>            
          <Box width="100%" h="550px" backgroundColor="gray.50">
            <Center backgroundColor="gray.50" mt={40}>
              <Box>
                <Images 
                  source={{uri: photo}} 
                  key={photo} 
                  size={24}  
                  ml={1}
                  alt={'Foto'}
                />
              </Box>
              
              <Text color="yellow.300" fontWeight="bold" textAlign="center" fontSize={"xl"} mt={5}>
                Uhu! Pedido Confirmado!
              </Text>
              <Text color="gray.600" textAlign="center" fontSize={"md"} mt={5} px={8}>
                Agora é so aguardar que o café já chegará para você!
              </Text>
              <ButtonDefault 
                title='IR PARA A HOME' 
                bg="purple.300" 
                size="half" 
                mt={8} 
                isLoading={loading}
                onPress={handleGoBackToHome}
              />
            </Center>  
          </Box>  
        </VStack>
      </SafeAreaView>
    </ScrollView>      
  );
}

