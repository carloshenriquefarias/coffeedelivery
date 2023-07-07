import { Box, HStack, Text, View } from "native-base";
import { Images } from '@components/Image';
import { ImageSourcePropType, Pressable, PressableProps } from "react-native";

export type Coffee = PressableProps & {
    id: string;
    tags?: string;
    name: string;
    description: string;
    photo: ImageSourcePropType;
    price: number;
}

export function TypeCoffee({id, name, tags, description, price, photo, ...rest} : Coffee){
    return(
        <Pressable>
            <Box 
                bg="white" 
                w={220} 
                h={350} 
                mt={5}
                mb={5}
                mx={4}
                
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
                <View 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        shadowColor: 'black',
                        shadowRadius: 30,
                        shadowOffset: {width: 0, height: 40},
                        shadowOpacity: 0.8,
                    }}
                >
                    <Images 
                        source={photo} 
                        key={id} 
                        size={32}  
                        mr={1}
                        alt={'Foto'}
                    />
                </View>
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
        </Pressable>
    )
}