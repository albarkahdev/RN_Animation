import React, { ReactNode } from 'react';
import { TextProps as OriginalTextProps, Text } from 'react-native';

import StyleGuide from './StyleGuide';
import { COLORS } from '../utils/colors';

export interface TextProps extends OriginalTextProps {
  dark?: boolean;
  type?: keyof typeof StyleGuide["typography"];
  children: ReactNode;
};

export default ({ dark, type, style, children }: TextProps) => {
  const color = dark ? COLORS.WHITE : COLORS.BLACK;
  return (
    <Text style={[StyleGuide.typography[type || "body"], { color }, style]}>
      {children}
    </Text>
  )
}
