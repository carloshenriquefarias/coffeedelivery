import { Box, HStack, Stack, Text } from "native-base";

export function TypeCoffee(){
    return(
        <Stack 
            bg="gray.200" 
            w={200} 
            h={300} 
            top={-70} 
            mx={8}
            rounded={[4, 16, 4, 16]} 
            justifyContent="center"
            alignItems="center"
        >
            <Box bg="purple.100" w="60%" h="10%" mt="5" rounded={10}>
                <Text color="purple.300" fontWeight="bold" textAlign="center">TRADICIONAL</Text>
            </Box>
            <Text color="gray.700" fontWeight="bold" textAlign="center" mt={3}>Latte</Text>
            <Text color="gray.500" textAlign="center" mt={2} px="2" fontSize="sm">
                Café expresso com o dobro de leite e espuma cremosa
            </Text>
            <HStack space={1}justifyContent="center" alignItems="center" mt={3}>
                <Text color="yellow.300" fontWeight="bold" textAlign="center">R$</Text>
                <Text color="yellow.300" fontWeight="bold" textAlign="center" fontSize="lg">9,99</Text>
            </HStack>
            
        </Stack>
    )
}