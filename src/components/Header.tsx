import { Text, HStack, IconButton, useTheme, Icon } from 'native-base'
import { ArrowRight, Plus, Tag, MapPin, ShoppingCart} from 'phosphor-react-native';

export function Header(){
    const {colors, sizes} = useTheme();

    function GoToCart(){

    }
    
    return (
        <HStack justifyContent="space-between" alignItems='center' mt={12} px={8}>
            <HStack justifyContent="flex-start" alignItems='center' space={2}>
                <MapPin color={colors.purple[200]} size={sizes[5]}/>
                <Text color="gray.300">Jaci Paraná, RO</Text>
            </HStack>

            <HStack justifyContent="flex-start" alignItems='center'>
                <IconButton
                    onPress={GoToCart}
                    icon={
                        <ShoppingCart color={colors.yellow[300]} size={sizes[5]}/>
                    }
                />
            </HStack>            
        </HStack>        
    )
}