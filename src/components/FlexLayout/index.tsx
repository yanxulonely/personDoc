import React from 'react';
import { theme } from 'antd';

type Direction = 'row' | 'column';
type Justify = 'start' | 'center' | 'end' | 'space-between' | 'space-around';
type Align = 'start' | 'center' | 'end' | 'stretch';
type ResponsiveValue<T> = T | T[];

interface FlexLayoutProps {
  children: React.ReactNode;
  direction?: ResponsiveValue<Direction>;
  justify?: ResponsiveValue<Justify>;
  align?: ResponsiveValue<Align>;
  gap?: ResponsiveValue<number>;
  style?: React.CSSProperties;
  className?: string;
}

const getResponsiveStyle = (
  value: string | string[] | number | number[],
  property: string,
  token: ReturnType<typeof theme.useToken>['token']
) => {
  if (Array.isArray(value)) {
    return {
      [property]: value[0],
      [`@media (min-width: ${token.screenSM}px)`]: {
        [property]: value[1]
      },
      [`@media (min-width: ${token.screenMD}px)`]: {
        [property]: value[2] || value[1]
      },
      [`@media (min-width: ${token.screenLG}px)`]: {
        [property]: value[3] || value[2] || value[1]
      },
      [`@media (min-width: ${token.screenXL}px)`]: {
        [property]: value[4] || value[3] || value[2] || value[1]
      }
    };
  }
  return { [property]: value };
};

const FlexLayout: React.FC<FlexLayoutProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  gap = 0,
  style,
  className
}) => {
  const { token } = theme.useToken();

  const flexStyle: React.CSSProperties = {
    display: 'flex',
    ...getResponsiveStyle(direction, 'flexDirection', token),
    ...getResponsiveStyle(
      justify === 'start' ? 'flex-start' :
      justify === 'end' ? 'flex-end' :
      justify,
      'justifyContent',
      token
    ),
    ...getResponsiveStyle(
      align === 'start' ? 'flex-start' :
      align === 'end' ? 'flex-end' :
      align,
      'alignItems',
      token
    ),
    ...getResponsiveStyle(
      Array.isArray(gap) 
        ? gap.map(g => `${g}px`)
        : `${gap}px`,
      'gap',
      token
    ),
    ...style
  };

  return (
    <div className={className} style={flexStyle}>
      {children}
    </div>
  );
};

export default FlexLayout; 