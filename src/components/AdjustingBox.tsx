
import { Box, HStack, Text, VStack, useTheme, IconButton } from 'native-base';
import { Trash, Plus, Minus } from 'phosphor-react-native';

import React from 'react';

type AdjustingBoxProps = {
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
  quantity: number;
};

export function AdjustingBox({
  onDecrease,
  onIncrease,
  quantity,
  onRemove,
}: AdjustingBoxProps) {
  const { colors, sizes } = useTheme();

  return (
    <HStack justifyContent="flex-start" alignItems="center" h={10} space={2}>
      <HStack justifyContent="space-between" alignItems="center" space={0}>
        <IconButton
          icon={<Minus color={colors.purple[200]} size={sizes[6]} />}
          onPress={onDecrease}
        />

        <Box>
          <Text fontSize={'md'} color={'gray.600'}>
            {quantity}
          </Text>
        </Box>

        <IconButton
          icon={<Plus color={colors.purple[200]} size={sizes[5]} />}
          onPress={onIncrease}
        />
      </HStack>

      <Box bg="gray.100" rounded={5}>
        <IconButton
          icon={<Trash color={colors.purple[200]} size={sizes[6]} />}
          onPress={onRemove}
        />
      </Box>
    </HStack>
  );
}
