import { Box, FlatList, HStack, ScrollView, Text, VStack, useTheme, SectionList } from 'native-base';
import { SafeAreaView, ImageSourcePropType } from 'react-native';
import { useState } from 'react';

import { BoxCondition } from '@components/BoxCondition';
import { CardCoffee } from '@components/CardCoffee';
import { Header } from '@components/Header';
import { InputSearch } from '@components/InputSearch';
import { TypeCoffee } from '@components/TypeCoffe';

import { coffeeData} from '../data/data';
import { RootStackScreenProps } from 'src/@types/navigation';

interface CoffeeData {
    id: string;
    tags: string;
    name: string;
    description: string;
    photo: ImageSourcePropType;
    price: string;
    onPress?: () => void;
}

const coffeeNames = ['Latte', 'Mocaccino', 'Irlandês'];
const selectedCoffees = coffeeData.filter(coffee => coffeeNames.includes(coffee.name));
const newCoffesArray = selectedCoffees.map(coffee => {
    return {
        id: coffee.id,
        tags: coffee.tags,
        name: coffee.name,
        description: coffee.description,
        photo: coffee.photo,
        price: coffee.price,
    };
});

export function Home({ navigation }: RootStackScreenProps<'Home'>){

    const coffeeOptions = ['TRADICIONAIS', 'DOCES', 'ESPECIAIS'];

    const [conditionSelected, setConditionSelected] = useState('TRADICIONAIS'); 
    const [filteredData, setFilteredData] = useState<CoffeeData[]>([]);
    const [search, setSearch] = useState('')
    // const [size, setSize] = useState(true);

    function handleGoToCart() {
        navigation.navigate('Cart');
    }

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
            onPress={() => handleGoToOrder(item.id)}
        />
    );

    const renderSectionHeader = ({ section }: { section: { title: string } }) => (
        <Text style={{ fontWeight: 'bold' }} pl={8} mt={4} color="gray.500">{section.title}</Text>
    );

    function handleCondition(item: string) {       
        setConditionSelected(item);             
        // setSize(item ==='TRADICIONAIS' ? true : false);        
    }

    const handleSearch = (text: string) => {
        const filtered = coffeeData.filter(coffee => coffee.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
        setSearch(text);
    };

    function handleGoToOrder(coffee_id: string) {
        navigation.navigate('Order', {coffee_id});
    }
    
    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView>
                <VStack flex={1}>            
                    <Box width="100%" h="400px" backgroundColor="gray.800">
                        <Header goToCart={handleGoToCart}/>
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
                                data={newCoffesArray} 
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