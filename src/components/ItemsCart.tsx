import { Box, FlatList, IconButton, ScrollView, VStack, View, theme, useToast} from 'native-base';
import { ImageSourcePropType } from 'react-native';
import { useCart } from '../hooks/useCart';
import { ItemCartCard } from './ItemCartCard';
import { useRef, useState } from 'react';
import { Swipeable } from "react-native-gesture-handler"
import { Trash } from 'phosphor-react-native';
import Animated, { SlideOutRight } from 'react-native-reanimated';

export interface Coffee {
    id: string;
    tags?: string[];
    name: string;
    description: string;
    photo: ImageSourcePropType;
    price: string;
}

export function ItemsCart(){

    const toast = useToast();
    const { cart, removeProductCart } = useCart();
    const swipeableRef = useRef<Swipeable[]>([])

    async function handleItemRemove(productId: string, index: number) {
        swipeableRef.current?.[index].close();

        try {
          await removeProductCart(productId);
    
          toast.show({
            title: 'Produto removido',
            placement: 'top',
            bgColor: 'green.500'
          });
    
        } catch (error) {
          toast.show({
            title: 'Não foi possível remover o produto',
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