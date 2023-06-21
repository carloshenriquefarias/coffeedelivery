import {Box, FlatList, HStack, ScrollView, Stack, StatusBar, Text, VStack, useTheme} from 'native-base'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ArrowRight, Plus, Tag} from 'phosphor-react-native';

import { InputSearch } from '@components/InputSearch';
import { Header } from '@components/Header';
import { TypeCoffee } from '@components/TypeCoffe';
import { useState } from 'react';
import { BoxCondition } from '@components/BoxCondition';
import { SafeAreaView } from 'react-native';
import { CardCoffee } from '@components/CardCoffee';
import { Loading } from '@components/Loading';

const coffeeData = [
    {
      id: '1',
      tags: 'TRADICIONAL',
      name: 'Latte',
      description: 'Café expresso com o dobro de leite e espuma cremosa',
      price: '9,99',
    },
    {
      id: '2',
      tags: 'TRADICIONAL',
      name: 'Cappuccino',
      description: 'Café expresso com leite vaporizado e cobertura de espuma de leite',
      price: '8,50',
    },
    {
      id: '3',
      tags: 'GELADO',
      name: 'Frappuccino',
      description: 'Café gelado com chantilly e calda de chocolate',
      price: '12,99',
    },
    {
      id: '4',
      tags: 'ESPECIAL',
      name: 'Mocha',
      description: 'Café expresso com leite, chocolate e chantilly',
      price: '10,50',
    },
]; 

export function Home(){
    const {colors, sizes} = useTheme();
    const coffeeOptions = ['TRADICIONAIS', 'DOCES', 'ESPECIAIS'];
    const [conditionSelected, setConditionSelected] = useState('TRADICIONAIS'); 
    const [isNew, setIsNew] = useState(true)
    const [loading, setLoading] = useState(false)

    function handleCondition(item: string) {       
        setConditionSelected(item);             
        setIsNew(item ==='TRADICIONAIS' ? true : false);        
    }

    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
            backgroundColor="gray.100"
        >
            <SafeAreaView>
                <VStack flex={1}>            
                    {/* <ExpoStatusBar style="light" /> */}
                    <Box width="100%" h="400px" backgroundColor="gray.800">
                        <Header/>
                        <Text mt={10} color="gray.200" fontSize="xl" px="8">
                            Encontre o café perfeito para qualquer hora do dia
                        </Text>
                        <InputSearch/>
                    </Box>
                    <Box width="100%" backgroundColor="white">
                        <TypeCoffee/>

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

                        <Stack mt={4}>                   
                            <FlatList
                                data={coffeeData} 
                                keyExtractor={item => item.id}
                                numColumns={1}

                                renderItem={({ item }) => (
                                    (!loading) ?
                                        <CardCoffee
                                            id={item.id}
                                            name={item.name}
                                            description={item.description}
                                            price={item.price}
                                        />
                                    :  
                                    <Loading bgColor='white'/>                  
                                )}

                                w='full' 
                                showsVerticalScrollIndicator={false}
                                _contentContainerStyle={{ paddingBottom: 20 }}

                                ListEmptyComponent={() => (
                                    <VStack alignItems='center' justifyContent='center' flex={1} mt={16}>                                    
                                        <Text fontFamily='body' color='gray.400' fontSize='md'>
                                            Nenhum café encontrado
                                        </Text>
                                    </VStack>
                                )}
                            />                    
                        </Stack> 
                    </Box>
                </VStack>
            </SafeAreaView>
        </ScrollView>      
    );
}