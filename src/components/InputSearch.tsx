import { Input as NativeBaseInput, useTheme, Box} from 'native-base';
import { MagnifyingGlass} from 'phosphor-react-native';

interface SearchboxProps {
    value: string;
    onChangeText: (value: string) => void;
}

export function InputSearch({value, onChangeText}: SearchboxProps) {
    const {colors, sizes} = useTheme();
    
    return (
        <NativeBaseInput
            bg="gray.700"
            h={10}
            w="83%"
            p={2}
            mx={8}
            borderWidth={0}
            fontSize="sm"
            color="gray.200"
            fontFamily="body"
            placeholderTextColor="gray.500"
            placeholder='Pesquisar'
            rounded={4}
            mt={5}

            onChangeText={onChangeText}
            value={value}

            _focus={{
                bgColor: 'red',
                borderWidth: 1,
                borderColor: 'purple.200'
            }}

            InputLeftElement={
                <Box pl={2}>
                  <MagnifyingGlass color={colors.gray[500]} size={sizes[4]} />
                </Box>
            }
        />
    );
  }