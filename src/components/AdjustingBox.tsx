
import { Box, HStack, Text, VStack, useTheme, IconButton } from 'native-base';
import { Trash, Plus, Minus } from 'phosphor-react-native';

import React from 'react';
import IconButtonBase from './BaseIconButton';

type AdjustingBoxProps = {
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
  quantity: number;
  isLoading: boolean;
};

export function AdjustingBox({
  onDecrease,
  onIncrease,
  quantity,
  onRemove,
  isLoading
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

      <IconButtonBase
        icon={<Trash color={colors.purple[200]} size={sizes[6]} />}
        onPress={onRemove}
        isLoading={isLoading}
      />
    </HStack>
  );
}
