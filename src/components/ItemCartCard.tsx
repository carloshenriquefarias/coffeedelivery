import { Box, HStack, Text, VStack, useTheme, IconButton, Input } from 'native-base';
import { Images } from '@components/Image';
import { useState } from "react";
import { Trash, Plus, Minus } from 'phosphor-react-native';
import { StorageCartProps } from '../storage/storageCoffee';
import { useCart } from '@hooks/useCart';

type Props = {
    onRemove: () => void;
    data: StorageCartProps;
}

export function ItemCartCard({ data, onRemove }: Props){
    const {colors, sizes} = useTheme();
    const { cart } = useCart();
    
    const [quantity, setQuantity] = useState(1);
    const unityCoffeePrice = parseFloat(data.price);
    const totalCoffeePrice = (unityCoffeePrice * quantity).toFixed(2);

    const calculateTotal = () => {
        cart.map((item) => {
            // const total = cart.reduce((acc, item) => acc + item.price, 0);
            const informations = {
                id: item.id,
                quantity: item.quantity,
                price: item.price
            }

            // console.log('aqui as 17:08 =>', informations);       
            return informations;           
          
        });
    };

    function handleAddToCart(){
        setQuantity(quantity + 1);
    };
    
    function handleRemoveFromCart(){
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return(
        <HStack
            justifyContent="space-between"
            alignItems="center"
            borderColor="gray.300"
            borderWidth="1px 0px 0px 0px"
            py={3}
            space={4}
            h={120}
            w="100%"
        >
            <Box justifyContent="space-between" alignItems="center">
                <Images 
                    source={data.photo} 
                    key={data.id} 
                    size={16}  
                    ml={1}
                    alt={'Foto'}
                />
            </Box>

            <VStack w="80%" justifyContent="flex-start">
                <HStack justifyContent="space-between" alignItems="center" mr={5}>
                    <Text color="gray.700" textAlign="center" fontSize="md" mt={0}>
                        {data.name}
                    </Text>
                    <Text color="gray.700" fontWeight="bold" textAlign="center" fontSize="sm">
                        R$ {totalCoffeePrice}
                    </Text>
                </HStack>
                <Text color="gray.500" textAlign="left" fontSize="sm">
                    {data.size}
                </Text>
                
                <HStack justifyContent="flex-start" alignItems='center' h={10} space={2}>
                    <HStack justifyContent="space-between" alignItems='center' space={0}>
                        <IconButton 
                            icon={<Minus color={colors.purple[200]} 
                            size={sizes[6]}/>}
                            onPress={calculateTotal}
                        />
                        
                        <Input
                            onChangeText={(text) => setQuantity(parseInt(text, 10))}
                            // keyboardType="numeric"
                            textAlign="center"
                            // value={calculateTotal()}
                            value={quantity.toString()}
                            w={10}
                            borderColor="transparent"
                            borderWidth={0}
                            fontSize={16}
                        />

                        <IconButton 
                            icon={<Plus color={colors.purple[200]}
                            size={sizes[5]}/>}
                            onPress={handleAddToCart}
                        />           
                    </HStack>

                    <Box bg="gray.100" rounded={5}>
                        <IconButton 
                            icon={<Trash color={colors.purple[200]} 
                            size={sizes[6]}/>}
                            onPress={onRemove}
                        />  
                    </Box>                             
                </HStack>
            </VStack>
        </HStack>
    )
}