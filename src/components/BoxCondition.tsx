import { Text, Pressable, IPressableProps } from 'native-base';

type Props = IPressableProps & {
  name: string;
  isActive: boolean;
}

export function BoxCondition({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
      bg="gray.50"
      rounded={10}
      h={6}
      w={'24'} 
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      mr={2}
      borderColor="purple.300"

      _pressed={{
        background: 'purple.200'
      }}
      
      {...rest}
    >
      <Text
        color={isActive ? "gray.100" : "purple.300"}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  );
}