import {Box, StatusBar, Text, VStack, useTheme} from 'native-base'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Header } from '@components/Header';
import { Horse, Heart, Cube } from 'phosphor-react-native';
import { InputSearch } from '@components/InputSearch';

export function Home(){
    const {colors, sizes} = useTheme();
    return(
        <VStack flex={1}>            
            <ExpoStatusBar style="light" />
            <Box flex={0.5} width="100%" backgroundColor="gray.800">
                <Header 
                    // iconLeft={<Horse/>}
                    // iconLeft={<Heart color={colors.gray[600]} weight="bold"/>}
                    text='Jaci Paraná, RO'
                    advice='Jaci - PR'
                />
                <Text mt={10} color="gray.200" fontSize="xl" px="8">
                    Encontre o café perfeito para qualquer hora do dia
                </Text>
                <InputSearch/>
            </Box>
            <Box flex={0.5} width="100%" backgroundColor="white">
                <Text>Olá cara</Text>
            </Box>
        </VStack>
    );
}