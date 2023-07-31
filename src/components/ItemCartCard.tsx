import { AdjustingBox } from '@components/AdjustingBox';
import { Box, HStack, Text, VStack} from 'native-base';
import { Images } from '@components/Image';
import { StorageCartProps} from '../storage/storageCoffee';
import { useState } from 'react';

type Props = {
    onRemove: () => void;
    addQuantity: () => void;
    removeQuantity: () => void;
    data: StorageCartProps;
    quantity: number;
    isLoading: boolean;
}

export function ItemCartCard({ data, onRemove, addQuantity, removeQuantity, quantity, isLoading = (false) }: Props){
    
    const unityCoffeePrice = data.price;
    const totalCoffeePrice = (unityCoffeePrice * quantity).toFixed(2);
    

    return(
        <HStack
            justifyContent="space-between"
            alignItems="center"
            borderColor="gray.300"
            borderWidth="1px 0px 0px 0px"
            py={3}
            space={4}
            h={120}
            w="100%"
        >
            <Box justifyContent="space-between" alignItems="center">
                <Images 
                    source={data.photo} 
                    key={data.id} 
                    size={16}  
                    ml={1}
                    alt={'Foto'}
                />
            </Box>          

            <VStack w="80%" justifyContent="flex-start">
                <HStack justifyContent="space-between" alignItems="center" mr={5}>                    
                    <Text color="gray.700" textAlign="center" fontSize="md" mt={0}>
                        {data.name}
                    </Text>
                    <Text color="gray.700" fontWeight="bold" textAlign="center" fontSize="sm">
                        R$ {totalCoffeePrice}
                    </Text>
                </HStack>

                <Text color="gray.500" textAlign="left" fontSize="sm">
                    {data.size}
                </Text>
                
                <AdjustingBox
                    onDecrease={removeQuantity}
                    onIncrease={addQuantity}
                    onRemove={onRemove}
                    quantity={quantity}
                    isLoading={isLoading}
                />               
            </VStack>
        </HStack>
    )
}