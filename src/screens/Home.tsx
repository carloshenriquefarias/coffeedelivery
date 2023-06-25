import {Box, FlatList, HStack, ScrollView, Stack, StatusBar, Text, VStack, useTheme, 
    SectionList, Button, Modal, Input as NativeBaseInput} from 'native-base'
;
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';

import { CardCoffee } from '@components/CardCoffee';
import { BoxCondition } from '@components/BoxCondition';
import { Header } from '@components/Header';
import { InputSearch } from '@components/InputSearch';
import { Loading } from '@components/Loading';
import { TypeCoffee } from '@components/TypeCoffe';
import { ModalMenseger } from '@components/ModalMenseger';


import coffee from '@assets/coffee.png';
import { ArrowRight, Plus, Tag, MapPin, ShoppingCart, MagnifyingGlass} from 'phosphor-react-native';

import { RootStackScreenProps } from 'src/@types/navigation';
import { BottomModal } from '@components/BottomModal';

interface CoffeeData {
    id: string;
    tags: string;
    name: string;
    description: string;
    photo: string;
    price: string;
    onPress?: () => void;
}

const coffeeBanner = [
    {
      id: '1',
      tags: 'TRADICIONAL',
      name: 'Latte',
      description: 'Café expresso com o dobro de leite e espuma cremosa',
      price: '9,99',
      photo: 'https://github.com/carloshenriquefarias.png'
    },
    {
      id: '2',
      tags: 'GELADO',
      name: 'Frappuccino',
      description: 'Café gelado com chantilly e calda de chocolate',
      price: '12,99',
      photo: 'https://github.com/carloshenriquefarias.png'
    },
    {
      id: '3',
      tags: 'ESPECIAL',
      name: 'Mocha',
      description: 'Café expresso com leite, chocolate e chantilly',
      price: '10,50',
      photo: 'https://github.com/carloshenriquefarias.png'
    },
]; 

export function Home({ navigation }: RootStackScreenProps<'Home'>){
    const {colors, sizes} = useTheme();
    const coffeeOptions = ['TRADICIONAIS', 'DOCES', 'ESPECIAIS'];
    const [conditionSelected, setConditionSelected] = useState('TRADICIONAIS'); 
    const [isNew, setIsNew] = useState(true)
    const [loading, setLoading] = useState(false)

    const [filteredData, setFilteredData] = useState<CoffeeData[]>([]);

    const [search, setSearch] = useState('')

    const coffeeData: CoffeeData[] = [
        {
          id: '1',
          tags: 'Tradicional',
          name: 'Latte',
          description: 'Café expresso com o dobro de leite e espuma cremosa',
          price: '9,99',
          photo: 'https://github.com/carloshenriquefarias.png'
        },
        {
          id: '2',
          tags: 'Tradicional',
          name: 'Cappuccino',
          description: 'Café expresso com leite vaporizado e cobertura de espuma de leite',
          price: '8,50',
          photo: 'https://github.com/carloshenriquefarias.png'
        },
        {
          id: '3',
          tags: 'GELADO',
          name: 'Frappuccino',
          description: 'Café gelado com chantilly e calda de chocolate',
          price: '12,99',
          photo: 'https://github.com/carloshenriquefarias.png'
        },
        {
          id: '4',
          tags: 'ESPECIAL',
          name: 'Mocha',
          description: 'Café expresso com leite, chocolate e chantilly',
          price: '10,50',
          photo: 'https://github.com/carloshenriquefarias.png'
        },
        {
            id: '5',
            tags: 'ESPECIAL',
            name: 'Mocha XL',
            description: 'Café expresso com leite, chocolate e chantilly',
            price: '15,50',
            photo: 'https://github.com/carloshenriquefarias.png'
        },
        {
            id: '6',
            tags: "Tradicional",
            name: "Expresso Tradicional",
            description: "O tradicional café feito com água quente e grãos moídos",
            photo: 'require(coffee)',
            price: '9.95',
        },
        {
            id: '7',
            tags: "Tradicional",
            name: "Expresso Americano",
            description: "Expresso diluído, menos intenso que o tradicional",
            photo: "americano.png",
            price: '9.9',
        },
        {
            id: '8',
            tags: "Tradicional",
            name: "Expresso Cremoso",
            description: "Café expresso tradicional com espuma cremosa",
            photo: "cremoso.png",
            price: '9.9',
        },
    ];

    function handleGoToOrder() {
        navigation.navigate('Order');
    }
    
    // function handleGoToMealScreen(coffee: CoffeeData) {
    // navigation.navigate('Order', { coffee });
    // }

    const sections: { [key: string]: { title: string; data: CoffeeData[] } } = coffeeData.reduce(
        (acc, coffee) => {
            const { tags, ...data } = coffee;
            if (acc[tags]) {
                acc[tags].data.push(data);
            } else {
                acc[tags] = { title: tags, data: [data] };
            }
            return acc;
        },
        {} as { [key: string]: { title: string; data: CoffeeData[] } }
    );

    const sectionsArray = Object.values(sections);

    const renderItem = ({ item }: { item: CoffeeData }) => (
        <CardCoffee
            id={item.id}
            photo={item.photo}
            name={item.name}
            description={item.description}
            price={item.price}
            onPress={handleGoToOrder}
        />
    );

    const renderSectionHeader = ({ section }: { section: { title: string } }) => (
        <Text style={{ fontWeight: 'bold' }} pl={8} mt={4} color="gray.500">{section.title}</Text>
    );

    function handleCondition(item: string) {       
        setConditionSelected(item);             
        setIsNew(item ==='TRADICIONAIS' ? true : false);        
    }

    const handleSearch = (text: string) => {
        const filtered = coffeeData.filter(coffee => coffee.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
        setSearch(text);
    };
    
    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
            // backgroundColor="gray.50"
        >
            <SafeAreaView>
                <VStack flex={1}>            
                    <Box width="100%" h="400px" backgroundColor="gray.800">
                        <Header goToCart={handleGoToOrder}/>
                        <Text mt={10} color="gray.200" fontWeight="bold" fontSize="lg" px="8">
                            Encontre o café perfeito para qualquer hora do dia
                        </Text>
                        <InputSearch
                            onChangeText={handleSearch}
                            value={search}
                        />
                    </Box>

                    <Box width="100%" backgroundColor="white">
                        <Box>
                            <FlatList
                                data={coffeeBanner} 
                                keyExtractor={item => item.id}
                                numColumns={1}
                                renderItem={({ item }) => (                                  
                                    <TypeCoffee
                                        id={item.id}
                                        photo={item.photo}
                                        tags={item.tags}
                                        name={item.name}
                                        description={item.description}
                                        price={item.price}
                                    />               
                                )}

                                horizontal
                                showsHorizontalScrollIndicator={false}
                                _contentContainerStyle={{ paddingBottom: 20 }}

                                ListEmptyComponent={() => (
                                    <VStack alignItems='center' justifyContent='center' flex={1} mt={16}>                                    
                                        <Text fontFamily='body' color='gray.400' fontSize='md'>
                                            Nenhum café encontrado
                                        </Text>
                                    </VStack>
                                )}
                            />  
                        </Box>                  

                        <Box top={-100}>
                            <Text color="gray.700" fontSize="md" px="8" fontWeight="bold">
                                Nossos cafés
                            </Text>

                            <HStack space={7} px="8" mt={4}>
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

                            <Box mt={3}>                                                
                                <SectionList
                                    sections={search.length > 0 ? [{ title: '', data: filteredData }] : sectionsArray}
                                    renderItem={renderItem}
                                    renderSectionHeader={renderSectionHeader}
                                    keyExtractor={(item, index) => item.id + index}
                                />
                            </Box>
                        </Box>
                    </Box>
                </VStack>
            </SafeAreaView>
        </ScrollView>      
    );
}