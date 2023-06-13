import {Box, StatusBar, Text, VStack} from 'native-base'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Header } from '@components/Header';

export function Home(){
    return(
        <VStack flex={1}>            
            <ExpoStatusBar style="light" />
            <Box flex={0.5} width="100%" backgroundColor="gray.800">
                <Header 
                    text='Jaci Paraná - RO'
                    advice='Jaci - PR'
                />
            </Box>
            <Box flex={0.5} width="100%" backgroundColor="white">
                <Text>Olá cara</Text>
            </Box>
        </VStack>
    );
}