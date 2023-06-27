import { Box, FlatList, ScrollView, VStack, useToast} from 'native-base';
import { ImageSourcePropType } from 'react-native';
import { useCart } from '../hooks/useCart';
import { ItemCartCard } from './ItemCartCard';

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

    async function handleItemRemove(productId: string) {
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
                        renderItem={({ item }) => (
                            <ItemCartCard
                                data={item}
                                onRemove={() => handleItemRemove(item.id)}
                            />
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