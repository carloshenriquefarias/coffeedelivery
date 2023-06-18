import { Text, HStack, IconButton, useTheme, Icon } from 'native-base'
import { Horse, Heart, Cube } from 'phosphor-react-native';

type HeaderProps = {
    iconRight?: JSX.Element;
    iconLeft?: JSX.Element;
    text?: string;
    advice?: string;
    onPress?: () => void;
    variant?: 'default' | 'base1' | 'base2';
}

export function Header( { iconLeft, variant, onPress, iconRight, text, advice } : HeaderProps ){
    const {colors, sizes} = useTheme();
    return (
        <HStack justifyContent="space-between" alignItems='center' mt={12} px={8}>
            <HStack justifyContent="flex-start" alignItems='center'>
                {/* <IconButton
                    onPress={onPress}
                    icon={<Heart color={colors.gray[600]} weight="bold"/>}
                    // icon={
                    //     <Icon
                    //     as={iconLeft}
                    //     name=''
                    //     size={6}
                    //     color={variant === 'default' ? 'purple.300' :  
                    //         variant === 'base1' ? 'gray.300' : 'gray.700'
                    //     }   
                    // />}
                /> */}
                <Text color="gray.300">{text}</Text>
            </HStack>

            <HStack justifyContent="flex-start" alignItems='center'>
                <Text color="gray.300">{iconRight}</Text>
                <Text color="purple.300">{advice}</Text>
            </HStack>            
        </HStack>        
    )
}