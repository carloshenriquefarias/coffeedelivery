import {Box, FlatList, HStack, ScrollView, Stack, StatusBar, Text, VStack, 
    useTheme, SectionList, Pressable, IconButton, Center, Input} from 'native-base'
;
import { Images } from '@components/Image';
import { useState } from "react";
import { Trash, Plus, Tag, Minus, ShoppingCart, ArrowLeft} from 'phosphor-react-native';
import coffee from '@assets/coffee.png';
import { ImageSourcePropType, Platform } from 'react-native';

export interface Coffee {
    id: string;
    tags?: string[];
    name: string;
    description: string;
    photo: ImageSourcePropType;
    price: string;
}

export function ItemCart(){

    const photo = coffee
    const [quantity, setQuantity] = useState(1);
    const {colors, sizes} = useTheme();

    function handleAddToCart(){
        setQuantity(quantity + 1);
    };
    
    function handleRemoveFromCart(){
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return(
        <Box bg="gray.50" w="100%" h={120} mt={5} borderColor="gray.300">
            <HStack
                justifyContent="space-between"
                alignItems="center"
                px={4}
                py={3}
            >
                <Box justifyContent="space-between" alignItems="center">
                    <Images 
                        source={photo} 
                        key={photo} 
                        size={16}  
                        ml={1}
                        alt={'Foto'}
                    />
                </Box>

                <VStack w="80%" justifyContent="flex-start">
                    <HStack justifyContent="space-between" alignItems="center" mr={4}>
                        <Text color="gray.700" textAlign="center" fontSize="md" mt={0}>
                            {/* {name} */}
                            Irlandes
                        </Text>
                        <Text color="gray.700" fontWeight="bold" textAlign="center" fontSize="lg">
                            {/* {price} */}
                            9,90
                        </Text>
                    </HStack>
                    <Text color="gray.500" textAlign="left" fontSize="sm">
                        {/* {price} */}
                        123 ml
                    </Text>
                    
                    <HStack justifyContent="flex-start" alignItems='center' h={10} space={2}>
                        <HStack justifyContent="space-between" alignItems='center' space={0}>
                            <IconButton 
                                icon={<Minus color={colors.purple[200]} 
                                size={sizes[6]}/>}
                                onPress={handleRemoveFromCart}
                            />
                            
                            <Input
                                onChangeText={(text) => setQuantity(parseInt(text, 10))}
                                // keyboardType="numeric"
                                textAlign="center"
                                value={quantity.toString()}
                                w={10}
                                borderColor="transparent"
                                borderWidth={0}
                                fontSize={16}
                            />

                            <IconButton 
                                icon={<Plus color={colors.purple[200]}
                                size={sizes[6]}/>}
                                onPress={handleAddToCart}
                            />           
                        </HStack>

                        <Box bg="gray.200" rounded={5}>
                            <IconButton 
                                icon={<Trash color={colors.purple[200]} 
                                size={sizes[6]}/>}
                                onPress={handleRemoveFromCart}
                            />  
                        </Box>                             
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    )
}