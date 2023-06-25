import { Text, HStack, IconButton, useTheme} from 'native-base'
import { MapPin, ShoppingCart } from 'phosphor-react-native';

type Props = {
    goToCart: () => void;
}

export function Header({ goToCart }: Props){
    const {colors, sizes} = useTheme();
    
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
            </HStack>            
        </HStack>        
    )
}