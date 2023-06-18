import { Input as NativeBaseInput, IInputProps, IIconButtonProps} from 'native-base';

export function InputSearch() { 
    return (        
        <NativeBaseInput
            bg="gray.200"                
            h={10}
            w="80%"
            px={8}
            borderWidth={0}
            fontSize="sm"
            color="gray.700"
            fontFamily="body"
            placeholderTextColor="gray.400"  
            placeholder='Buscar anúncio'
            rounded={8} 
            mt={5}         
            
            _focus={{
                bgColor: 'red',
                borderWidth: 1,
                borderColor: 'blue.500'
            }}   
            
        />          
    );
}
