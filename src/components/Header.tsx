import { Text, HStack } from 'native-base'

type HeaderProps = {
    iconLeft?: string;
    iconRight?: string;
    text?: string;
    advice: string;
}

export function Header( { iconLeft, iconRight, text, advice } : HeaderProps ){
    return (
        <HStack justifyContent="space-between" alignItems='center' mt={12} px={8}>
            <HStack justifyContent="flex-start" alignItems='center'>
                <Text color="gray.300">{iconLeft}</Text>
                <Text color="purple.300">{text}</Text>
            </HStack>

            <HStack justifyContent="flex-start" alignItems='center'>
                <Text color="gray.300">{iconRight}</Text>
                <Text color="purple.300">{advice}</Text>
            </HStack>            
        </HStack>        
    )
}