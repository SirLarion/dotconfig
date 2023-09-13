import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { Card } from '@hox/ui/Card';
import { Heading4 } from '@hox/ui/Text';

const StyledCardGroup = styled(Card)`
  padding: 1.5rem;
  > :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  > * {
    flex: 1;
  }
`;

export const CardGroup: FC<{ heading: ReactNode }> = ({
  heading,
  children,
  ...restProps
}) => {
  return (
    <StyledCardGroup {...restProps}>
      <Heading4>{heading}</Heading4>
      <CardContainer>{children}</CardContainer>
    </StyledCardGroup>
  );
};
