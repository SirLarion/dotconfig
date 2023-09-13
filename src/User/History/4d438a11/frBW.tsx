import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { Card } from '../../../Card';
import { palette, WithTheme } from '../../../styles/theme';

export const BaseAnalyticsCardStyled = styled(Card)`
  background: ${palette(p => p.background.primary)};
  padding: 1rem 1.5rem;
  > :first-child {
    margin-bottom: 0.5rem;
  }
  ${({ theme }: WithTheme) =>
    theme.name === 'light' &&
    css`
      border: 1px solid ${palette(p => p.outline.secondary.dimmed)};
    `}
`;

export const BaseAnalyticsCard: FC = ({ children, ...restProps }) => {
  return (
    <BaseAnalyticsCardStyled {...restProps}>{children}</BaseAnalyticsCardStyled>
  );
};
