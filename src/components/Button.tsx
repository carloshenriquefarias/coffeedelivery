import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'default' | 'base1' | 'base2';
  icon?: JSX.Element;
  size?: 'total' | 'half' 
}

export function ButtonDefault({ title, icon, variant = 'default', size = 'half',...rest }: Props) {
  return (
    <ButtonNativeBase        
      w={size === "half" ? '50%' : 'full'}
      h={size === "half" ? '12' : '12'}           
      
      bg={variant === 'default' ? 'purple.300' :  
        variant === 'base1' ? 'gray.500' : 'yellow.300'
      }    

      borderColor="purple.300"
      rounded="md"

      _pressed={{
        bg: variant === 'default' ? 'purple.200' :  
          variant === 'base1' ? 'gray.600' : 'yelllow.200'
        }
      }
      
      {...rest}
    >
      {icon}
      
      <Text 
        color={variant === 'default' ? 'gray.100' : 'white'}
        fontFamily="body"
        fontSize="sm"
        textAlign="center"
        fontWeight={variant === 'default' ? 'bold' : ''}
      >
        {title}
      </Text>
      
    </ButtonNativeBase>
  );
}