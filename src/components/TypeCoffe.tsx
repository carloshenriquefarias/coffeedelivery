import { Box, HStack, Stack, Text } from "native-base";
import { Images } from '@components/Image';

export interface Coffee {
    id: string;
    tags?: string;
    name: string;
    description: string;
    photo: string;
    price: string;
}

export function TypeCoffee({id, name, tags, description, price, photo} : Coffee){
    return(
        <Box 
            bg="gray.200" 
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
            }} 
            justifyContent="center"
            alignItems="center"
        >
            <Images 
                source={{uri: photo}} 
                key={photo} 
                size={24}  
                mr={1}
                alt={'Foto'}
            />
            <Box bg="purple.100" w="60%" h="10%" mt="5" rounded={10}>
                <Text color="purple.300" fontWeight="bold" textAlign="center">{tags}</Text>
            </Box>
            <Text color="gray.700" fontWeight="bold" textAlign="center" mt={3}>{name}</Text>
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