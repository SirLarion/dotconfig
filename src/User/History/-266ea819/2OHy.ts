import { CSSProperties } from 'react';
import { Serie } from '@nivo/line';

export type TLineStyle = 'solid' | 'dashed';

export type TLineFill = 'none' | 'translucent' | 'gradient' | string;

export type TSerieProps = Serie & {
  color?: string;
  style?: {
    line?: TLineStyle;
    fill?: TLineFill;
    css?: CSSProperties;
  };
};

export type TSerieIdStyle = Record<string, CSSProperties>;
