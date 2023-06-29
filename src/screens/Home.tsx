import { Box, FlatList, HStack, ScrollView, Text, VStack, useTheme, SectionList, Modal, IconButton } from 'native-base';
import { SafeAreaView, ImageSourcePropType } from 'react-native';
import { useState, useMemo, useRef, useCallback} from 'react';

import { BoxCondition } from '@components/BoxCondition';
import { CardCoffee } from '@components/CardCoffee';
import { Header } from '@components/Header';
import { InputSearch } from '@components/InputSearch';
import { TypeCoffee } from '@components/TypeCoffe';

import { coffeeData} from '../data/data';
import { RootStackScreenProps } from 'src/@types/navigation';

import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import { ModalMenseger } from '@components/ModalMenseger';
import { MapPin, ShoppingCart, ArrowRight} from 'phosphor-react-native';
import { useCart } from '@hooks/useCart';
import { useFocusEffect } from '@react-navigation/native';

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
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['48%'] ,[]) 

    const [conditionSelected, setConditionSelected] = useState('TRADICIONAIS'); 
    const [filteredData, setFilteredData] = useState<CoffeeData[]>([]);
    const [search, setSearch] = useState('')
    const [newCoffee, setNewCoffee] = useState(1)
    const [modalVisible, setModalVisible] = useState(false);
    const [lastProduct, setLastProduct] = useState({});

    const { cart } = useCart();
    const { colors, sizes} = useTheme();

    function newProductOnCart(){
        const productsCart = cart
        const amountCoffee = productsCart.length
        if (amountCoffee + 1 > amountCoffee){
            console.log('ta entrando aqui as 14:26 =>', amountCoffee)
            // handleOpenModal()
            // {productsCart.length > 1 && <AlertModal/>}
    
            const lastCoffee = productsCart[productsCart.length - 1];
            setLastProduct(lastCoffee);
        }
       
        // console.log('aqui as 14:15 =>', lastCoffee)
        
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

    useFocusEffect(useCallback(() => {
        newProductOnCart();
    },[]))
    
    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView>
                <VStack flex={1}>            
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
                </VStack>

                <AlertModal/>

                {/* <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    enablePanDownToClose
                    index={-1}
                >
                    <VStack flex={1} px={6}>
                        <HStack justifyContent='space-between' alignItems='center'>
                            
                        </HStack>

                        <ScrollView 
                            showsVerticalScrollIndicator={false} 
                            contentContainerStyle={{paddingBottom: 16}}
                        >
                            <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3}>
                                Condição
                            </Text>
                        


                            <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={1}>
                                Aceita troca?
                            </Text>                       
                           
                            <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3}>
                                Métodos de Pagamentos Aceitos:
                            </Text>                            
                            
                            <HStack 
                                justifyContent="space-between" 
                                space={2} 
                                pt={5} 
                                pb={5}
                            >
                                  
                            </HStack> 
                        </ScrollView>
                    </VStack>
                </BottomSheet> */}
            </SafeAreaView>
        </ScrollView>      
    );
}