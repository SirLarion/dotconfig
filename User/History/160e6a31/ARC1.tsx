import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { ButtonText } from '@hox/ui/Text';

import { Link, linkStyles } from '../../../../components/Link';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;

  > * {
    ${linkStyles};
  }

  > :first-child:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const TestingKbLink: FC<{
  withIcon?: boolean;
  children?: ReactNode;
}> = ({ withIcon, children = 'Technical testing guide', ...restProps }) => {
  return (
    <StyledLink {...restProps}>
      {withIcon && (
        <HoxIcon.ExternalLink size={1.25} color={palette(p => p.cta.primary)} />
      )}
      <ButtonText>{children}</ButtonText>
    </StyledLink>
  );
};
