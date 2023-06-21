import { Box, HStack, VStack, Text, Center } from "native-base";
import { Images } from '@components/Image';
export interface Coffee {
    id: string;
    tags?: string[];
    name: string;
    description: string;
    photo: string;
    price: string;
}

export function CardCoffee ({id, name, description, price, tags, photo} : Coffee) {
    return(
        <Box
            bg="gray.100"
            w={340}
            h={140}
            mx={8}
            mt={5}
            style={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 25,
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 25,
                overflow: 'hidden',
            }}
            >
            <HStack
                justifyContent="space-between"
                alignItems="center"
                px={4}
                py={3}
            >
                <Box top={-30}>
                    <Images 
                        source={{uri: photo}} 
                        key={photo} 
                        size={24}  
                        ml={1}
                        alt={'Foto'}
                    />
                </Box>

                <Center w="70%">
                <Text color="gray.700" fontWeight="bold" textAlign="center" fontSize="md" mt={1}>
                    {name}
                </Text>
                <Text color="gray.500" textAlign="center" mt={2} px="2" fontSize="sm">
                    {description}
                </Text>
                <HStack space={1} justifyContent="center" alignItems="center" mt={1}>
                    <Text color="yellow.300" fontWeight="bold" textAlign="center">
                    R$
                    </Text>
                    <Text color="yellow.300" fontWeight="bold" textAlign="center" fontSize="lg">
                    {price}
                    </Text>
                </HStack>
                </Center>
            </HStack>
        </Box>

    )
}