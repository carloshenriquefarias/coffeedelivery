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

export function Order(){
  const {colors, sizes} = useTheme();
  const coffeeSizes = ['114 ml', '140 ml', '227 ml'];
  const [conditionSelected, setConditionSelected] = useState('114 ml'); 
  const [quantity, setQuantity] = useState(1);
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

  function handleCondition(item: string) {       
      setConditionSelected(item);             
      setIsNew(item ==='TRADICIONAIS' ? true : false);        
  }

  function handleAddToCart(){
    setQuantity(quantity + 1);
  };

  function handleRemoveFromCart(){
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return(
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
      // backgroundColor="gray.800"
    >
      <SafeAreaView>
        <VStack flex={1}>            
          <Box width="100%" h="500px" backgroundColor="gray.800">
            <HStack justifyContent="space-between" alignItems='center' mt={12} px={8}>
              <HStack justifyContent="flex-start" alignItems='center' space={1}>
                <IconButton
                  icon={<ArrowLeft color={colors.gray[200]} size={sizes[6]}/>}
                />
              </HStack>

              <HStack justifyContent="flex-start" alignItems='center'>
                <IconButton
                  icon={<ShoppingCart color={colors.purple[200]} size={sizes[5]}/>}
                />
                <Box rounded="full" w={5} h={5} bg="purple.200" top={-15} left={-15}>
                  <Text color="gray.200" fontWeight="bold" textAlign="center" fontSize="xs">5</Text>
                </Box>
              </HStack>            
            </HStack>  

            <Box bg="gray.700" w="120px" h="35px" mt="3" rounded={10} ml={8} justifyContent="center" alignItems='center'>
              <Text color="gray.200" fontWeight="bold" textAlign="center">Especial</Text>
            </Box>

            <HStack justifyContent="space-between" alignItems='center' mt={5} px={9}>
              <Text color="gray.200" fontWeight="bold" textAlign="center" fontSize={"xl"}>Irlandês</Text>
              <HStack justifyContent="space-between" alignItems='center' space={1}>
                <Text color="yellow.200" fontWeight="bold" textAlign="center" fontSize={"sm"}>R$</Text> 
                <Text color="yellow.200" fontWeight="bold" textAlign="center" fontSize={"xl"}>9,90</Text>           
              </HStack>                 
            </HStack>

            <Text color="gray.200" textAlign="left" mt={5} px={8} fontSize={"md"}>
              Bebida a base de café, uisque irlandes, acucar e muito chantilly
            </Text> 

            <Center mt={5}>
              <Images 
                source={{uri: 'https://github.com/carloshenriquefarias.png'}} 
                key={1} 
                size={220}  
                mr={1}
                alt={'Foto'}
              />                
            </Center>                          
          </Box>  

          <Box width="100%" backgroundColor="white">
            <Text color="gray.500" textAlign="left" mt={5} px={8} fontSize={"md"}>
              Selecione o tamanho:
            </Text>

            <HStack space={6} mx="8" mt={4}>
              <FlatList 
                data={coffeeSizes}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <BoxCondition 
                    size="large"
                    name={item}
                    isActive={conditionSelected.toLocaleUpperCase() 
                      === item.toLocaleUpperCase()}
                    onPress={() => handleCondition(item)}                                               
                  />                                                                         
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />                                                                 
            </HStack>

            <HStack justifyContent="space-between" alignItems='center' mt={4} mx={8} bg="gray.100" h={70}>
              <HStack justifyContent="space-between" alignItems='center' space={1}>
                <IconButton 
                  icon={<Minus color={colors.purple[200]} 
                  size={sizes[6]}/>}
                  onPress={handleRemoveFromCart}
                />
                
                <Input
                  onChangeText={(text) => setQuantity(parseInt(text, 10))}
                  // keyboardType="numeric"
                  textAlign="center"
                  value={quantity.toString()}
                  w={14}
                  borderColor="transparent"
                  borderWidth={0}
                  fontSize={20}
                />

                <IconButton 
                  icon={<Plus color={colors.purple[200]}
                  size={sizes[5]}/>}
                  onPress={handleAddToCart}
                />           
              </HStack>  
              <ButtonDefault title='Adicionar' mr={2}/>                               
            </HStack>
          </Box>                  
        </VStack>
      </SafeAreaView>
    </ScrollView>      
  );
}

