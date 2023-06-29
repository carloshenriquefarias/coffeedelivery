import {Box, HStack, ScrollView, StatusBar, Text, VStack, useTheme, IconButton} from 'native-base';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { useState } from 'react';
import { ArrowLeft} from 'phosphor-react-native';

import { ButtonDefault } from '@components/Button';
import { ItemsCart } from '@components/ItemsCart';

import { RootStackScreenProps } from 'src/@types/navigation';
import { storageProductGetAll, storageProductSave } from '@storage/storageCoffee';
import { useCart } from '@hooks/useCart';

export function Cart({ navigation }: RootStackScreenProps<'Cart'>){
  const { colors, sizes } = useTheme();
  const { cart } = useCart();

  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  // const addToCart = (item) => {
  //   setCartItems([...cartItems, item]);
  // };

  const calculateTotal = () => {
    let total = 0;
    cart.map((item) => {
      const quantity = item.quantity; // assume 1 se a quantidade não estiver definida
      const price = parseFloat(item.price);
      total = price * quantity;

      const totals = cart.reduce((sumTotal, product) => {
        sumTotal += price * quantity;   
       
        return sumTotal;
      }, 0)

      // console.log('aqui as 16:12 =>', totals);
    });
    return total.toFixed(2);
  };

  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total += parseFloat(cart[i].price);
  }

  const geralPrice = total.toFixed(2)
   


  function handleGoBackToHome() {
    setLoading(true)
    navigation.navigate('Home');
    setLoading(false)
  }

  function handleConfirmOrder() {
    setLoading(true)
    navigation.navigate('OrderFinished');
    setLoading(false)
  }

  return(
    <>
      <VStack flex={1}>      
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          showsVerticalScrollIndicator={false}            
        >
          <VStack flex={1} >
            <Box width="100%" h="82%" backgroundColor="gray.50">
              <HStack justifyContent="space-around" alignItems='center' mt={12} px={1} space={1}>
                <IconButton 
                  icon={<ArrowLeft color={colors.gray[700]} 
                  size={sizes[6]}/>} 
                  onPress={handleGoBackToHome}
                />
                <Text color="gray.700" fontWeight="bold" textAlign="center" fontSize={"lg"}>Carrinho</Text>
                <Text color="gray.50" fontWeight="bold" textAlign="center" fontSize={"lg"}>Irlandês</Text>
              </HStack>

              <ItemsCart/> 

              {/* <Center backgroundColor="gray.50" mt={40}>
                <IconButton icon={<ArrowLeft color={colors.gray[700]} size={sizes[6]}/>} />
              <Text color="gray.700" textAlign="center" fontSize={"sm"} mt={1}>
                  Seu carrinho está vazio
                </Text>
                <ButtonDefault title='VER O CATÁLOGO' bg="purple.300" size="half" mt={8}/>
              </Center>   */}
            </Box>      
          </VStack> 
        </ScrollView>                    
      </VStack>

      <Box
        justifyContent="space-between" 
        bg="white" 
        pt={1} pb={5}
        position="absolute" 
        bottom={0}
        w='full'
        h='18%'
      >
        <HStack justifyContent="space-between" alignItems='center' mt={2} px={8}>
          <Text color="gray.600" textAlign="center" fontSize="md">Valor Total</Text>

         
          <HStack justifyContent="flex-start" alignItems='center' space={2}>
            <Text color="gray.800" fontWeight="bold" textAlign="center" fontSize="xs">R$</Text>
            <Text color="gray.800" fontWeight="bold" textAlign="center" fontSize="lg">{geralPrice}</Text>
          </HStack>
  

          {/* <HStack justifyContent="flex-start" alignItems='center' space={2}>
            <Text color="gray.800" fontWeight="bold" textAlign="center" fontSize="xs">R$</Text>
            <Text color="gray.800" fontWeight="bold" textAlign="center" fontSize="lg">9,99</Text>
          </HStack>             */}
        </HStack>

        <HStack alignItems='center' mt={2} px={8} mb={10}>
          <ButtonDefault 
            title='CONFIRMAR O PEDIDO' 
            bg="yellow.300" 
            size="total" 
            mt={2} 
            isLoading={loading} 
            onPress={handleConfirmOrder}
          />
        </HStack>              
      </Box>  
    </>
  );
}

