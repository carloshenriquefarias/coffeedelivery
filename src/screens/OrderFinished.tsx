import {Box, ScrollView, StatusBar, Text, VStack, useTheme, Center, Container} from 'native-base';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { Images } from '@components/Image';
import { ButtonDefault } from '@components/Button';

import { RootStackScreenProps } from 'src/@types/navigation';
import Illustration from '@assets/Illustration.png';

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
            <Box>
              <Images 
                source={Illustration} 
                key={1} 
                size={40}  
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
            {/* <ButtonDefault size="half" title='ADICIONAR' mr={2} onPress={handleGoBackToHome} isLoading={loading}/>                                */}
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
  );
}

