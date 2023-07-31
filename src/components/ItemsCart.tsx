import { Box, FlatList, IconButton, ScrollView, VStack, View, theme, useToast} from 'native-base';
import { ImageSourcePropType } from 'react-native';
import { ItemCartCard } from './ItemCartCard';
import { Swipeable } from "react-native-gesture-handler"
import { Trash } from 'phosphor-react-native';
import { useCart } from '../hooks/useCart';
import { useRef, useState } from 'react';

import Animated, { SlideOutRight } from 'react-native-reanimated';
import { isLoading } from 'expo-font';
export interface Coffee {
    id: string;
    tags?: string[];
    name: string;
    description: string;
    photo: ImageSourcePropType;
    price: number;
}

export function ItemsCart(){

    const { cart, removeProductCart, addItemProductCart, removeItemProductCart} = useCart();

    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();
    const swipeableRef = useRef<Swipeable[]>([]);

    async function handleItemRemove(productId: string, index: number) {
        swipeableRef.current?.[index].close();

        try {

            setIsLoading(true);
            await removeProductCart(productId);
        
            toast.show({
                title: 'Produto removido',
                placement: 'top',
                bgColor: 'green.500'
            });
            setIsLoading(false);
    
        } catch (error) {
          toast.show({
            title: 'Não foi possível remover o produto',
            placement: 'top',
            bgColor: 'red.500'
          });
        }
    }

    async function handleAddItem(productId: string, index: number) {
        try {
            await addItemProductCart(productId);
    
        } catch (error) {
            toast.show({
                title: 'Não foi possível aumentar a quantidade do produto',
                placement: 'top',
                bgColor: 'red.500'
            });
        }
    }

    async function handleRemoveItemCart(productId: string, index: number) {
        try {
            await removeItemProductCart(productId);
    
        } catch (error) {
            toast.show({
                title: 'Não foi possível diminuir a quantidade do produto',
                placement: 'top',
                bgColor: 'red.500'
            });
        }
    }

    return(
        <VStack flex={1}>     
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }} 
                showsVerticalScrollIndicator={false}              
            >
                <Box bg="gray.50" w="100%" mt={5}>
                    <FlatList
                        data={cart}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <Animated.View
                                key={item.id}
                                // entering={SlideInRight}
                                exiting={SlideOutRight}
                                // layout={Layout.springify()}
                            >
                                <Swipeable
                                    ref={ref => {
                                        if (ref) {
                                            swipeableRef.current.push(ref)
                                        }
                                    }}
                                    overshootLeft={false}
                                    leftThreshold={10}
                                    renderRightActions={() => null}
                                    renderLeftActions={() => (
                                        <View 
                                            width={90}
                                            height={120}
                                            rounded={6}
                                            background="red.200"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <IconButton
                                                icon={<Trash size={32} color={theme.colors.gray[100]} />}
                                                onPress={() => handleItemRemove(item.id, index)}
                                            />                                            
                                        </View>
                                    )}
                                >
                                    <ItemCartCard
                                        data={item}
                                        onRemove={() => handleItemRemove(item.id, index)}
                                        addQuantity={() => handleAddItem(item.id, index)}
                                        removeQuantity={() => handleRemoveItemCart(item.id, index)}
                                        quantity={item.quantity}
                                        isLoading={isLoading}
                                    />
                                </Swipeable>
                            </Animated.View>
                        )}
                        _contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        px={8}
                        mt={2}
                    />
                </Box>
            </ScrollView>
        </VStack> 
    )
}