import React from 'react';
import { Box, IconButton as BaseIconButton } from 'native-base';
import { Trash } from 'phosphor-react-native';

type AdjustingBoxProps = {
    onPress: () => void;
    isLoading: boolean;
    icon: JSX.Element;

};

const IconButtonBase = ({ icon, onPress, isLoading, ...rest }: AdjustingBoxProps) => {
  return (
    <Box bg="gray.100" rounded={5}>
      <BaseIconButton 
        icon={icon} 
        onPress={onPress} 
        {...rest} 
      />
    </Box>
  );
};

export default IconButtonBase;
