import { Box, HStack, VStack, Text, Center } from "native-base";

export interface Coffee {
    id: string;
    // tags: string[];
    name: string;
    description: string;
    // photo: string;
    price: string;
}

export function CardCoffee ({id, name, description, price} : Coffee) {
    return(
        <HStack 
            bg="gray.100" 
            w="340" 
            h="150" 
            mx={8}
            rounded={[4, 16, 4, 16]} 
            justifyContent="space-between"
            alignItems="center"
            mt={5}
        >
            <Box bg="gray.300" w="40%">
                <Text color="purple.300" fontWeight="bold" textAlign="center">{id}</Text>
            </Box>

            <Center w="60%" bg="gray.100">
                <Text color="gray.700" fontWeight="bold" textAlign="center" mt={1}>{name}</Text>
                <Text color="gray.500" textAlign="center" mt={2} px="2" fontSize="sm">
                    {description}
                </Text>
                <HStack space={1}justifyContent="center" alignItems="center" mt={1}>
                    <Text color="yellow.300" fontWeight="bold" textAlign="center">R$</Text>
                    <Text color="yellow.300" fontWeight="bold" textAlign="center" fontSize="lg">{price}</Text>
                </HStack>
            </Center>            
        </HStack>
    )
}