import { Text, HStack, IconButton, useTheme, Box} from 'native-base'
import { MapPin, ShoppingCart } from 'phosphor-react-native';
import { useCart } from '@hooks/useCart';

type Props = {
    goToCart: () => void;
    quantityCoffee: number;
}

export function Header({ goToCart, quantityCoffee }: Props){
    const {colors, sizes} = useTheme();
    const { cart } = useCart();
    
    return (
        <HStack justifyContent="space-between" alignItems='center' mt={12} px={8}>
            <HStack justifyContent="flex-start" alignItems='center' space={2}>
                <MapPin color={colors.purple[200]} size={sizes[5]}/>
                <Text fontWeight="bold" color="gray.300">Jaci Paraná, RO</Text>
            </HStack>

            <HStack justifyContent="flex-start" alignItems='center'>
                <IconButton
                    onPress={goToCart}
                    icon={ <ShoppingCart color={colors.yellow[300]} size={sizes[5]}/>}
                />
                {cart.length > 1 && 
                    <Box rounded="full" w={5} h={5} bg="purple.200" top={-15} left={-15}>
                        <Text color="gray.200" fontWeight="bold" textAlign="center" fontSize="xs">
                            {quantityCoffee}
                        </Text>
                    </Box>
                }
            </HStack>            
        </HStack>        
    )
}