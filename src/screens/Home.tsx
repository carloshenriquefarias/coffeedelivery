import {Box, FlatList, HStack, ScrollView, StatusBar, Text, VStack, useTheme} from 'native-base'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ArrowRight, Plus, Tag} from 'phosphor-react-native';

import { InputSearch } from '@components/InputSearch';
import { Header } from '@components/Header';
import { TypeCoffee } from '@components/TypeCoffe';
import { useState } from 'react';
import { BoxCondition } from '@components/BoxCondition';
import { SafeAreaView } from 'react-native';
import { CardCoffee } from '@components/CardCoffee';

export function Home(){
    const {colors, sizes} = useTheme();
    const coffeeOptions = ['TRADICIONAIS', 'DOCES', 'ESPECIAIS'];
    const [conditionSelected, setConditionSelected] = useState('TRADICIONAIS'); 
    const [isNew, setIsNew] = useState(true)

    function handleCondition(item: string) {       
        setConditionSelected(item);             
        setIsNew(item ==='TRADICIONAIS' ? true : false);        
    }

    return(
        // <ScrollView 
        //     contentContainerStyle={{ flexGrow: 1 }} 
        //     showsVerticalScrollIndicator={false}
        //     backgroundColor="gray.100"
        // >
        //     <SafeAreaView>
                <VStack flex={1}>            
                    <ExpoStatusBar style="light" />
                    <Box flex={0.6} width="100%" backgroundColor="gray.800">
                        <Header/>
                        <Text mt={10} color="gray.200" fontSize="xl" px="8">
                            Encontre o café perfeito para qualquer hora do dia
                        </Text>
                        <InputSearch/>
                    </Box>
                    <Box flex={0.5} width="100%" backgroundColor="white">
                        <TypeCoffee/>

                        {/* <CardCoffee/> */}

                        <Text color="gray.700" fontSize="md" px="8">
                            Nossos cafés
                        </Text>

                        <HStack space={5} px="8" mt={4}>
                            <FlatList 
                                data={coffeeOptions}
                                keyExtractor={item => item}
                                renderItem={({ item }) => (
                                    <BoxCondition 
                                        name={item}
                                        isActive={conditionSelected.toLocaleUpperCase() 
                                            === item.toLocaleUpperCase()}
                                        onPress={() =>  handleCondition(item)}                                               
                                    />                                                                         
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />                                                                 
                        </HStack>
                    </Box>
                </VStack>
        //     </SafeAreaView>
        // </ScrollView>      
    );
}