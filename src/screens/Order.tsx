import {Box, FlatList, HStack, ScrollView, Text, VStack, 
  useTheme, IconButton, Center, Input, useToast} from 'native-base'
;

import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { CoffeeData } from '@dtos/CoffeeDTO';
import { storageCoffeeGet } from '@storage/storageCoffee';

import { coffee } from '@assets/coffee.png';
import { coffeeData } from '../data/data';
import { Plus, Minus, ShoppingCart, ArrowLeft} from 'phosphor-react-native';

import { BoxCondition } from '@components/BoxCondition';
import { ButtonDefault } from '@components/Button';
import { Images } from '@components/Image';
import { Loading } from '@components/Loading';

import { RootStackScreenProps } from 'src/@types/navigation';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

type RouteParamsProps = {
  coffee_id: string;
}

export function Order({ navigation }: RootStackScreenProps<'Order'>){

  const route = useRoute();
  const toast = useToast();
  const coffeeSizes = ['114 ml', '140 ml', '227 ml'];  

  const {colors, sizes} = useTheme();
  const {coffee_id} = route.params as RouteParamsProps

  const [coffeeInformations, setCoffeeInformations] = useState<CoffeeData>();
  const [conditionSelected, setConditionSelected] = useState('114 ml'); 
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(true);

  async function fetchCoffeeSelectedDetails() {
    try {
      storageCoffeeGet().then(coffeeData => {});
      const coffee = coffeeData.find(coffee => coffee.id === coffee_id);
      console.log('aqui as 09:59 =>', coffee);
      setCoffeeInformations(coffee);
    
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do café';
  
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setLoading(false);
    }
  }

  function handleCondition(item: string) {       
    setConditionSelected(item);             
    setSize(item ==='TRADICIONAIS' ? true : false);        
  }

  function handleAddToCart(){
    setQuantity(quantity + 1);
  };

  function handleRemoveFromCart(){
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  function handleGoBackToHome() {
    setLoading(true)
    navigation.navigate('Home');
    setLoading(false)
  }

  function handleGoToCart() {
    setLoading(true)
    navigation.navigate('Cart');
    setLoading(false)
  }

  useFocusEffect(useCallback(() => {
    fetchCoffeeSelectedDetails();
  },[coffee_id]))

  return(
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <VStack flex={1}>            
          <Box width="100%" h="500px" backgroundColor="gray.800">
            <HStack justifyContent="space-between" alignItems='center' mt={12} px={8}>
              <HStack justifyContent="flex-start" alignItems='center' space={1}>
                <IconButton icon={<ArrowLeft color={colors.gray[200]} size={sizes[6]}/>} onPress={handleGoBackToHome}/>
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
              <Text color="gray.200" fontWeight="bold" textAlign="center">{coffeeInformations?.tags}</Text>
            </Box>

            <HStack justifyContent="space-between" alignItems='center' mt={5} px={9}>
              <Text color="gray.200" fontWeight="bold" textAlign="center" fontSize={"xl"}>{coffeeInformations?.name}</Text>
              <HStack justifyContent="space-between" alignItems='center' space={1}>
                <Text color="yellow.200" fontWeight="bold" textAlign="center" fontSize={"sm"}>R$</Text> 
                <Text color="yellow.200" fontWeight="bold" textAlign="center" fontSize={"xl"}>{coffeeInformations?.price}</Text>           
              </HStack>                 
            </HStack>

            <Text color="gray.200" textAlign="left" mt={5} px={8} fontSize={"md"}>
              {coffeeInformations?.description}
            </Text> 

            <Center mt={5}>
              <Images 
                source={coffee} 
                key={1} 
                size={220}  
                mr={1}
                alt={'Foto'}
              />                
            </Center>                          
          </Box>  

          <Box width="100%" backgroundColor="white">
            <Text color="gray.500" textAlign="left" mt={3} px={8} fontSize={"sm"}>
              Selecione o tamanho:
            </Text>

            <Center mx="8" mt={4}>
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
            </Center>

            <HStack justifyContent="space-between" alignItems='center' mt={3} mx={8} bg="gray.100" h={60} mb={10}>
              <HStack justifyContent="space-between" alignItems='center' space={1}>
                <IconButton 
                  icon={<Minus color={colors.purple[200]} 
                  size={sizes[5]}/>}
                  onPress={handleRemoveFromCart}
                />
                
                <Input
                  onChangeText={(text) => setQuantity(parseInt(text, 10))}
                  // keyboardType="numeric"
                  textAlign="center"
                  value={quantity.toString()}
                  w={10}
                  borderColor="transparent"
                  borderWidth={0}
                  fontSize={16}
                />

                <IconButton 
                  icon={<Plus color={colors.purple[200]}
                  size={sizes[4]}/>}
                  onPress={handleAddToCart}
                />           
              </HStack>  
              <ButtonDefault size="half" title='ADICIONAR' mr={2} onPress={handleGoToCart} isLoading={loading}/>                               
            </HStack>
          </Box>                  
        </VStack>
      </SafeAreaView>
    </ScrollView>      
  );
}

