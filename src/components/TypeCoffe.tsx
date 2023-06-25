import { Box, HStack, Text } from "native-base";
import { Images } from '@components/Image';
import { ImageSourcePropType, Pressable } from 'react-native';
export interface Coffee {
    id: string;
    tags?: string;
    name: string;
    description: string;
    photo: ImageSourcePropType;
    price: string;
}

export function TypeCoffee({id, name, tags, description, price, photo} : Coffee){
    return(
        <Box 
            bg="gray.50" 
            w={200} 
            h={300} 
            top={-70} 
            mx={8}

            style={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 25,
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 25,
                overflow: 'hidden',
                elevation: 2, // para Android
                shadowColor: '#000', // para iOS
                shadowOffset: { width: 0, height: 3 }, // para iOS
                shadowOpacity: 0.2, // para iOS
                shadowRadius: 8, // para iOS
            }} 
            justifyContent="center"
            alignItems="center"
        >
            <Images 
                source={photo} 
                key={id} 
                size={24}  
                mr={1}
                alt={'Foto'}
            />
            <Box bg="purple.100" w="55%" h="10%" mt="5" rounded={10} justifyContent="center" alignItems="center">
                <Text fontSize="xs" color="purple.300" fontWeight="bold" textAlign="center">{tags}</Text>
            </Box>
            <Text fontSize="lg" color="gray.700" fontWeight="bold" textAlign="center" mt={3}>{name}</Text>
            <Text color="gray.500" textAlign="center" mt={2} px="2" fontSize="sm">
                {description}
            </Text>
            <HStack space={1}justifyContent="center" alignItems="center" mt={3}>
                <Text color="yellow.300" fontWeight="bold" textAlign="center">R$</Text>
                <Text color="yellow.300" fontWeight="bold" textAlign="center" fontSize="lg">{price}</Text>
            </HStack>            
        </Box>
    )
}