import React, { FC } from 'react';
import styled from 'styled-components';

import { Card } from '../../../Card';
import { palette } from '../../../styles/theme';

export const BaseAnalyticsCardStyled = styled(Card)`
  background: ${palette(p => p.background.primary)};
  border: 1px solid ${palette(p => p.outline.secondary.dimmed)};
  padding: 1rem 1.5rem;
  > :first-child {
    margin-bottom: 0.5rem;
  }
`;

export const BaseAnalyticsCard: FC = ({ children, ...restProps }) => {
  return (
    <BaseAnalyticsCardStyled {...restProps}>{children}</BaseAnalyticsCardStyled>
  );
};
