import { Text, Pressable, IPressableProps } from 'native-base';

type Props = IPressableProps & {
  name: string;
  isActive: boolean;
  size?: 'large' | 'small'
}

export function SizeSelected({ name, isActive, size = 'small', ...rest }: Props) {
  return (
    <Pressable
      bg={isActive ? "gray.50" : "gray.50"}
      rounded={size === "small" ? '10' : '5'}
      w={size === "small" ? '24' : '24'}
      h={size === "small" ? '6' : '10'} 
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      mr={3}
      borderColor={isActive ? "purple.200" : "gray.400"}
      borderWidth={1}

      _pressed={{
        background: 'gray.50'
      }}
      
      {...rest}
    >
      <Text
        color={isActive ? "purple.200" : "gray.500"}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  );
}