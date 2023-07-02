import { Box, HStack, Text, VStack, useTheme, Button } from 'native-base';
import { Images } from '@components/Image';
import { AdjustingBox } from '@components/AdjustingBox';
import { useState } from "react";
import { Trash, Plus, Minus } from 'phosphor-react-native';
import { StorageCartProps, storageCoffeeSave, updateCartItem} from '../storage/storageCoffee';
import { useCart } from '@hooks/useCart';

type Props = {
    onRemove: () => void;
    data: StorageCartProps;
}

export function ItemCartCard({ data, onRemove }: Props){
    const {colors, sizes} = useTheme();
    const { cart } = useCart();
    
    const [quantity, setQuantity] = useState(data.quantity);
    const unityCoffeePrice = data.price;
    const totalCoffeePrice = (unityCoffeePrice * quantity).toFixed(2);

    const [items, setItems] = useState(cart);
      
    const updateQuantity = (itemId: string, newQuantity: number) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
                }
            
                return item;
            })
        );
    };

    const [cartItems, setCartItems] = useState(cart);

    const quantitiesCurrent = cartItems.map((item) => item.quantity);

    const [quantities, setQuantities] = useState(() => {
        const initialQuantities = cart.map((product) => product.quantity);
        return initialQuantities;
    });

    const handleIncrease = (productId) => {
        setCartItems((prevCartItems) => {
          const updatedCartItems = prevCartItems.map((item) => {
            if (item.id === productId) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          return updatedCartItems;
        });
    };

    const getQuantity = (productId) => {
        const item = cartItems.find((item) => item.id === productId);
        return item ? item.quantity : 2; 
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
                {/* <HStack>
                    {items.map(item => (
                        <Text key={item.id}>
                        <Text>{item.name}</Text>
                        <Text>Quantidade: {item.quantity}</Text>
                        <Button onPress={() => updateQuantity(item.id, item.quantity + 1)}>Aumentar quantidade</Button>
                        <Button onPress={() => updateQuantity(item.id, item.quantity - 1)}>Diminuir quantidade</Button>
                        </Text>
                    ))}
                </HStack> */}

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
                
                <AdjustingBox
                    onDecrease={() => handleIncrease(1)}
                    onIncrease={() => handleIncrease(1)}
                    onRemove={onRemove}
                    quantity={getQuantity(1)}
                />               
            </VStack>
        </HStack>
    )
}