export type TLineStyle = 'solid' | 'dashed';

export type TLineFill = 'none' | 'translucent' | 'gradient';

export type TSerieProps = Serie & {
  color?: string;
  style?: TLineStyle;
  fill?: TLineFill;
};