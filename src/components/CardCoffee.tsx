import { Box, HStack, VStack, Text, Center } from "native-base";
import { Images } from '@components/Image';
import { ImageSourcePropType, Pressable } from 'react-native';
export interface Coffee {
    id: string;
    tags?: string[];
    name: string;
    description: string;
    photo: ImageSourcePropType;
    price: number;
    onPress: () => void;
}

export function CardCoffee ({id, name, description, price, tags, photo, onPress} : Coffee) {

    return(
        <Pressable onPress={onPress}>
            <Box
                bg="gray.50"
                w={340}
                h={140}
                mx={8}
                mt={10}
                mb={2}
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
                >
                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    px={4}
                    py={3}
                    space={3}
                >
                    <Box top={0}>
                        <Images 
                            source={photo} 
                            key={id} 
                            size={24}  
                            ml={1}
                            alt={''}
                        />
                    </Box>

                    <VStack w="70%" justifyContent="center" alignItems="flex-start">
                        <Text color="gray.700" fontWeight="bold" textAlign="center" fontSize="md" mt={1}>
                            {name}
                        </Text>
                        <Text color="gray.500" textAlign="left" pr={3} mt={2} fontSize="sm">
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
                    </VStack>
                </HStack>
            </Box>
        </Pressable>
    )
}