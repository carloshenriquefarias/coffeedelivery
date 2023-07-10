import { Box, HStack, ScrollView, StatusBar, Text, VStack, useTheme, IconButton, Center} from 'native-base';

import { ArrowLeft, ShoppingCart} from 'phosphor-react-native';
import { ButtonDefault } from '@components/Button';
import { ItemsCart } from '@components/ItemsCart';
import { RootStackScreenProps } from 'src/@types/navigation';
import { useState } from 'react';
import { useCart } from '@hooks/useCart';

export function Cart({ navigation }: RootStackScreenProps<'Cart'>){

  const { colors, sizes } = useTheme();
  const { cart } = useCart();

  const [loading, setLoading] = useState(false);

  const total = cart.reduce((accumulator, item) => {
    const subtotal = item.quantity * item.price;
    return accumulator + subtotal;
  }, 0);
   
  function handleGoBackToHome() {
    setLoading(true)
    navigation.navigate('Home');
    setLoading(false)
  }

  async function handleConfirmOrder() {
    await setLoading(true)
    navigation.navigate('OrderFinished');
    setLoading(false)
  }

  return(
    <>
      {cart.length >= 1 ?
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
                <Text color="gray.800" fontWeight="bold" textAlign="center" fontSize="lg">{total}</Text>
              </HStack>
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
      :
      <>
        <VStack flex={1} backgroundColor="gray.50">      
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}  
          >
            <VStack flex={1}>
              <HStack justifyContent="space-around" alignItems='center' mt={12} px={1} space={1}>
                <IconButton 
                  icon={<ArrowLeft color={colors.gray[700]} 
                  size={sizes[6]}/>} 
                  onPress={handleGoBackToHome}
                />
                <Text color="gray.700" fontWeight="bold" textAlign="center" fontSize={"lg"}>Carrinho</Text>
                <Text color="gray.50" fontWeight="bold" textAlign="center" fontSize={"lg"}>Irlandês</Text>
              </HStack>

              <Box width="100%" h="70%" backgroundColor="gray.50" justifyContent="center" alignItems="center">              
                <Center backgroundColor="gray.50">
                  <IconButton icon={<ShoppingCart color={colors.gray[500]} size={sizes[6]}/>} />
                  <Text color="gray.700" textAlign="center" fontSize={"sm"} mt={1}>
                    Seu carrinho está vazio
                  </Text>                  
                </Center>  
                <ButtonDefault title='VER O CATÁLOGO' bg="purple.300" size="half" mt={8} onPress={handleGoBackToHome}/>           
              </Box>      
            </VStack> 
          </ScrollView>                    
        </VStack> 
      </>
    }
    </>
  );
}

