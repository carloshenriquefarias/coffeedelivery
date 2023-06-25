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

interface CoffeeData {
    id: string;
    tags: string;
    name: string;
    description: string;
    photo: string;
    price: string;
}

const coffeeBanner = [
    {
      id: '1',
      tags: 'TRADICIONAL',
      name: 'Latte',
      description: 'Café expresso com o dobro de leite e espuma cremosa',
      price: '9,99',
      photo: 'https://github.com/carloshenriquefarias.png'
    },
    {
      id: '2',
      tags: 'GELADO',
      name: 'Frappuccino',
      description: 'Café gelado com chantilly e calda de chocolate',
      price: '12,99',
      photo: 'https://github.com/carloshenriquefarias.png'
    },
    {
      id: '3',
      tags: 'ESPECIAL',
      name: 'Mocha',
      description: 'Café expresso com leite, chocolate e chantilly',
      price: '10,50',
      photo: 'https://github.com/carloshenriquefarias.png'
    },
]; 

export function Cart({ navigation }: RootStackScreenProps<'Cart'>){
  const {colors, sizes} = useTheme();
  const coffeeSizes = ['114 ml', '140 ml', '227 ml'];
  const [conditionSelected, setConditionSelected] = useState('114 ml'); 
 
  const [isNew, setIsNew] = useState(true)
  const [loading, setLoading] = useState(false)

  const coffeeData: CoffeeData[] = [
      {
        id: '1',
        tags: 'TRADICIONAL',
        name: 'Latte',
        description: 'Café expresso com o dobro de leite e espuma cremosa',
        price: '9,99',
        photo: 'https://github.com/carloshenriquefarias.png'
      },
      {
        id: '2',
        tags: 'TRADICIONAL',
        name: 'Cappuccino',
        description: 'Café expresso com leite vaporizado e cobertura de espuma de leite',
        price: '8,50',
        photo: 'https://github.com/carloshenriquefarias.png'
      },
      {
        id: '3',
        tags: 'GELADO',
        name: 'Frappuccino',
        description: 'Café gelado com chantilly e calda de chocolate',
        price: '12,99',
        photo: 'https://github.com/carloshenriquefarias.png'
      },
      {
        id: '4',
        tags: 'ESPECIAL',
        name: 'Mocha',
        description: 'Café expresso com leite, chocolate e chantilly',
        price: '10,50',
        photo: 'https://github.com/carloshenriquefarias.png'
      },
      {
          id: '5',
          tags: 'ESPECIAL',
          name: 'Mocha XL',
          description: 'Café expresso com leite, chocolate e chantilly',
          price: '15,50',
          photo: 'https://github.com/carloshenriquefarias.png'
      },
  ];

  function handleGoBackToOrder() {
    // setLoading(true)
    navigation.navigate('Order');
    setLoading(false)
  }

  function handleConfirmOrder() {
    // setLoading(true)
    navigation.navigate('OrderFinished');
    setLoading(false)
  }

  function handleCondition(item: string) {       
      setConditionSelected(item);             
      setIsNew(item ==='TRADICIONAIS' ? true : false);        
  }

  return(
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
      // backgroundColor="gray.800"
    >
      <SafeAreaView>
        <VStack flex={1}>            
          <Box width="100%" h="550px" backgroundColor="gray.50">
            <HStack justifyContent="space-around" alignItems='center' mt={12} px={1} space={1}>
              <IconButton icon={<ArrowLeft color={colors.gray[700]} size={sizes[6]}/>} onPress={handleGoBackToOrder}/>
              <Text color="gray.700" fontWeight="bold" textAlign="center" fontSize={"lg"}>Carrinho</Text>
              <Text color="gray.50" fontWeight="bold" textAlign="center" fontSize={"xl"}>Irlandês</Text>
            </HStack> 

            <ItemCart/>

            {/* <Center backgroundColor="gray.50" mt={40}>
              <IconButton icon={<ArrowLeft color={colors.gray[700]} size={sizes[6]}/>} />
              <Text color="gray.700" textAlign="center" fontSize={"sm"} mt={1}>
                Seu carrinho está vazio
              </Text>
              <ButtonDefault title='VER O CATÁLOGO' bg="purple.300" size="half" mt={8}/>
            </Center>   */}
          </Box>  

          <Box width="100%" backgroundColor="white">
            <HStack justifyContent="space-between" alignItems='center' mt={5} px={8}>
              <Text color="gray.600" textAlign="center" fontSize="md">Valor Total</Text>
              <HStack justifyContent="flex-start" alignItems='center' space={2}>
                <Text color="gray.800" fontWeight="bold" textAlign="center" fontSize="xs">R$</Text>
                <Text color="gray.800" fontWeight="bold" textAlign="center" fontSize="lg">9,99</Text>
              </HStack>            
            </HStack>

            <HStack alignItems='center' mt={2} px={8} mb={10}>
              <ButtonDefault title='CONFIRMAR O PEDIDO' bg="yellow.300" size="total" mt={2} onPress={handleConfirmOrder}/>
            </HStack>
          </Box>                  
        </VStack>        
      </SafeAreaView>
    </ScrollView>      
  );
}

