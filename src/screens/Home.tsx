import { Box, FlatList, HStack, ScrollView, Text, VStack, useTheme, SectionList, Modal, IconButton, View } from 'native-base';
import { SafeAreaView, ImageSourcePropType, Dimensions} from 'react-native';
import { useState, useCallback} from 'react';

import { BoxCondition } from '@components/BoxCondition';
import { CardCoffee } from '@components/CardCoffee';
import { Header } from '@components/Header';
import { InputSearch } from '@components/InputSearch';
import { ModalMenseger } from '@components/ModalMenseger';
import { TypeCoffee } from '@components/TypeCoffe';

import { coffeeData} from '../data/data';
import { RootStackScreenProps } from 'src/@types/navigation';

import { ShoppingCart, ArrowRight} from 'phosphor-react-native';
import { useCart } from '@hooks/useCart';
import { useFocusEffect } from '@react-navigation/native';

import Carousel from 'react-native-snap-carousel';
import Animated, { BounceInDown, BounceInRight, BounceInUp } from 'react-native-reanimated';

interface CoffeeData {
    id: string;
    tags: string;
    name: string;
    description: string;
    photo: ImageSourcePropType;
    price: number;
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

const {width} = Dimensions.get('window');

export function Home({ navigation }: RootStackScreenProps<'Home'>){
    
    const [conditionSelected, setConditionSelected] = useState('TRADICIONAIS'); 
    const [filteredData, setFilteredData] = useState<CoffeeData[]>([]);
    const [search, setSearch] = useState('')
    const [newCoffee, setNewCoffee] = useState(1)
    const [modalVisible, setModalVisible] = useState(false);
    const [lastProduct, setLastProduct] = useState({});
    
    const { cart } = useCart();
    const { colors, sizes} = useTheme();
    
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
        {} as { [key: string]: { title: string; data: CoffeeData[] }}
    );       
        
    const coffeeOptions = ['TRADICIONAIS', 'DOCES', 'ESPECIAIS'];
    const sectionsArray = Object.values(sections);    

    function newProductOnCart(){
        const productsCart = cart
        const amountCoffee = productsCart.length
        if (amountCoffee + 1 > amountCoffee){
            // handleOpenModal()    
            const lastCoffee = productsCart[productsCart.length - 1];
            setLastProduct(lastCoffee);
        }        
    }

    function AlertModal() {        
        return <>
            <Modal 
                isOpen={modalVisible} 
                onClose={() => setModalVisible(false)} 
                avoidKeyboard 
                justifyContent="flex-end" 
                bottom="0" 
                size="xl"
                width="100%"
            >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Produto Adicionado</Modal.Header>
                    <Modal.Body>
                        <HStack justifyContent="space-between" alignItems='center' px={2}>
                            <HStack justifyContent="space-between" alignItems='center' w="50%">
                                <HStack space={2} alignItems='center'>   
                                    <Box justifyContent="center" alignItems='center' bg="gray.400" rounded={10}>
                                        <IconButton
                                            icon={<ShoppingCart color={colors.white} size={sizes[5]}/>}
                                        />                            
                                    </Box>
                                    <Box rounded="full" w={5} h={5} bg="purple.200" top={-18} left={-18}>
                                        <Text color="gray.200" fontWeight="bold" textAlign="center" fontSize="xs">
                                            {/* {lastProduct.quantity} */}
                                        </Text>
                                    </Box>                     
                                </HStack>
                                <Text color="gray.500">
                                    {/* {lastProduct.quantity} unidades de cafe {lastProduct.name} de {lastProduct.size} foi adicionado no carrinho! */}
                                </Text>  
                            </HStack>   
                            <HStack justifyContent="flex-start" alignItems='center' space={2}>
                                <Text fontWeight="bold" color="purple.200">Ver</Text>
                                <IconButton
                                    icon={<ArrowRight color={colors.purple[200]} size={sizes[5]}/>}
                                    onPress={handleGoToCart}
                                />                           
                            </HStack>
                        </HStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </>;
    }

    function handleGoToCart() {
        navigation.navigate('Cart');
    }

    function handleOpenModal() {
        setModalVisible(true);
    }

    function renderItem({ item }: { item: CoffeeData }) {
        return (
            <CardCoffee
                id={item.id}
                photo={item.photo}
                name={item.name}
                description={item.description}
                price={item.price}
                onPress={() => handleGoToOrder(item.id)}
            />
        );
    }
    
    function renderSectionHeader({ section }: { section: { title: string } }) {
        return (
            <Text style={{ fontWeight: 'bold' }} pl={8} mt={4} color="gray.500">{section.title}</Text>
        );
    }

    function handleCondition(item: string) {       
        setConditionSelected(item);                   
    }

    const handleSearch = (text: string) => {
        const filtered = coffeeData.filter(coffee => coffee.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
        setSearch(text);
    };

    function handleGoToOrder(coffee_id: string) {
        navigation.navigate('Order', {coffee_id});
    }

    useFocusEffect(useCallback(() => {
        newProductOnCart();
    },[]))
    
    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView>
                <VStack flex={1} bg="gray.50"> 
                    <Animated.View entering={BounceInUp.duration(3000).delay(1000)}>            
                        <Box width="100%" h="400px" backgroundColor="gray.800">
                            <Header goToCart={handleGoToCart} quantityCoffee={cart.length}/>
                            <Text mt={10} color="gray.200" fontWeight="bold" fontSize="lg" px="8">
                                Encontre o café perfeito para qualquer hora do dia
                            </Text>
                            <InputSearch
                                onChangeText={handleSearch}
                                value={search}
                            />
                        </Box>
                    </Animated.View>                    
                   
                    <View bg="white">
                        <Animated.View entering={BounceInRight.duration(4000).delay(2000)}> 
                            <Carousel
                                containerCustomStyle={{ overflow: 'visible' }}
                                data={newCoffesArray}
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
                                firstItem={1}
                                loop={true}
                                inactiveSlideScale={0.75}
                                inactiveSlideOpacity={0.75}
                                sliderWidth={width}
                                itemWidth={width * 0.55}
                                slideStyle={{ display: 'flex', alignItems: 'center' }}
                            />
                        </Animated.View>
                    </View>

                    <Animated.View entering={BounceInDown.duration(3000).delay(1000)}>                   
                        <Box width="100%" backgroundColor="white">
                            <Box mt={5}>
                                <Box borderWidth="1px" h={24} alignItems='flex-start' justifyContent='center' borderColor="gray.100" >
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
                                </Box>

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
                    </Animated.View>
                </VStack>
                <AlertModal/>
            </SafeAreaView>
        </ScrollView>      
    );
}