import {Box, FlatList, HStack, ScrollView, Text, VStack, 
  useTheme, IconButton, Center, Input, useToast} from 'native-base'
;

import { CoffeeData } from '@dtos/CoffeeDTO';
import { SafeAreaView } from 'react-native';
import { storageCoffeeGet } from '@storage/storageCoffee';
import { useCallback, useState } from 'react';

import { coffeeData } from '../data/data';
import { Plus, Minus, ShoppingCart, ArrowLeft} from 'phosphor-react-native';

import { SizeSelected } from '@components/SizeSelected';
import { ButtonDefault } from '@components/Button';
import { Images } from '@components/Image';
import { Loading } from '@components/Loading';

import { RootStackScreenProps } from 'src/@types/navigation';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import { AppError } from '@utils/AppError';
import { useCart } from '@hooks/useCart';

import coffeeImage from '@assets/coffeeImage.png';
import Smoke from '@assets/Smoke.png';

type RouteParamsProps = {
  coffee_id: string;
}

export function Order({ navigation }: RootStackScreenProps<'Order'>){

  const route = useRoute();
  const toast = useToast();
  const coffeeSizes = ['114 ml', '140 ml', '227 ml'];  
  
  const { addProductCart } = useCart();
  const { colors, sizes} = useTheme();
  const { coffee_id} = route.params as RouteParamsProps

  const [coffeeInformations, setCoffeeInformations] = useState<CoffeeData>({} as CoffeeData);
  const [sizeSelected, setSizeSelected] = useState('114 ml'); 
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(true);

  async function handleAddProductToCart() {

    try {
      
      setLoading(true);

      const coffeeSelectedData = {
        id: coffeeInformations?.id,
        size: sizeSelected,
        name: coffeeInformations?.name,
        quantity: quantity,
        price: coffeeInformations?.price,
        photo: coffeeInformations?.photo,
      }

      await addProductCart(
        coffeeSelectedData
      );

      // toast.show({
      //   title: 'Produto adicionado no carrinho',
      //   placement: 'top',
      //   bgColor: 'green.500'
      // });

      setLoading(false);

      navigation.navigate('Home');
      
    } catch (error) {
      toast.show({
        title: 'Não foi possível adicionar o produto no carrinho',
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }  

  async function fetchCoffeeSelectedDetails() {
    try {
      storageCoffeeGet().then(coffeeData => {});
      const coffee = coffeeData.find(coffee => coffee.id === coffee_id);
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
    setSizeSelected(item);             
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
                  icon={<ShoppingCart color={colors.gray[50]} size={sizes[5]}/>}
                />
                {/* <Box rounded="full" w={5} h={5} bg="purple.200" top={-15} left={-15}>
                  <Text color="gray.200" fontWeight="bold" textAlign="center" fontSize="xs">5</Text>
                </Box> */}
              </HStack>            
            </HStack>  

            <Box bg="gray.700" w="120px" h="35px" mt="3" rounded={10} ml={8} justifyContent="center" alignItems='center'>
              <Text color="gray.200" fontWeight="bold" textAlign="center">{coffeeInformations?.tags}</Text>
            </Box>

            <HStack justifyContent="space-between" alignItems='center' mt={3} px={9}>
              <Text color="gray.200" fontWeight="bold" textAlign="center" fontSize={"lg"}>{coffeeInformations?.name}</Text>
              <HStack justifyContent="space-between" alignItems='center' space={1}>
                <Text color="yellow.200" fontWeight="bold" textAlign="center" fontSize={"sm"}>R$</Text> 
                <Text color="yellow.200" fontWeight="bold" textAlign="center" fontSize={"xl"}>{coffeeInformations?.price}</Text>           
              </HStack>                 
            </HStack>

            <Text color="gray.200" textAlign="left" mt={2} px={8} fontSize={"md"}>
              {coffeeInformations?.description}
            </Text> 

            <Box justifyContent="center" alignItems='center' bottom={-30} h={30}>
              <Images 
                source={Smoke} 
                key={1} 
                size={16}  
                mr={1}
                alt={'Foto'}
              />  
            </Box>

            <Box justifyContent="center" alignItems='center' bottom={-10}>
              <Images 
                source={coffeeImage} 
                key={1} 
                size={80}  
                mr={1}
                alt={'Foto'}
                resizeMode='cover'
              />                
            </Box>                          
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
                  <SizeSelected 
                    size="large"
                    name={item}
                    isActive={sizeSelected.toLocaleUpperCase() 
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
              <ButtonDefault size="half" title='ADICIONAR' mr={2} onPress={handleAddProductToCart} isLoading={loading}/>                               
            </HStack>
          </Box>                  
        </VStack>
      </SafeAreaView>
    </ScrollView>      
  );
}

