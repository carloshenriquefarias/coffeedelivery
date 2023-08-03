import {Box, Text, VStack, Center } from 'native-base';

import { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { Images } from '@components/Image';
import { ButtonDefault } from '@components/Button';

import { RootStackScreenProps } from 'src/@types/navigation';

import Illustration from '@assets/Illustration.png';
import Animated, { BounceIn, BounceInDown, BounceInLeft } from 'react-native-reanimated';

export function OrderFinished({ navigation }: RootStackScreenProps<'OrderFinished'>){

  const [loading, setLoading] = useState(false)

  async function handleGoBackToHome() {
    await setLoading(true);
    navigation.navigate('Home');
    setLoading(false)
  }

  return(
    <SafeAreaView>
      <VStack flex={1}>            
        <Box width="100%" h="900px" backgroundColor="gray.50">
          <Center backgroundColor="gray.50" mt={40} width="100%">
            <Animated.View entering={BounceInLeft.duration(2500)}>
              <Images 
                source={Illustration} 
                key={1} 
                size={40}  
                ml={1}
                alt={'Foto'}
              />
            </Animated.View>

            <Animated.View entering={BounceIn.duration(3000)}>            
              <Text color="yellow.300" fontWeight="bold" textAlign="center" fontSize={"xl"} mt={5}>
                Uhu! Pedido Confirmado!
              </Text>
              <Text color="gray.600" textAlign="center" fontSize={"md"} mt={5} px={8}>
                Agora é so aguardar que o café já chegará para você!
              </Text>
            </Animated.View>                     
          </Center> 

          <Animated.View entering={BounceInDown.duration(3000)}>  
            <Box width="100%" mt={5} backgroundColor="gray.50" justifyContent="center" alignItems="center">    
              <ButtonDefault 
                title='IR PARA A HOME' 
                bg="purple.300" 
                size="half"                 
                isLoading={loading}
                onPress={handleGoBackToHome}
              />
            </Box> 
          </Animated.View>  
        
        </Box>
      </VStack>
    </SafeAreaView>    
  );
}

