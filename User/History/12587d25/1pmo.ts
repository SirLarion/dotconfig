import { Serie } from '@nivo/line';
import { CSSProperties } from 'react';

export type TLineStyle = 'solid' | 'dashed';

export type TLineFill = 'none' | 'translucent' | 'gradient';

export type TSerieProps = Serie & {
  color?: string;
  style?: TLineStyle;
  fill?: TLineFill;
};

export type TSerieIdStyle = Record<string, CSSProperties>;
