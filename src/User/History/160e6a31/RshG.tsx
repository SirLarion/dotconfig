import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { ButtonText } from '@hox/ui/Text';

import { linkStyles } from '../../../../components/Link';
import { KnowledgeBaseLink } from '../../../../components/KnowledgeBaseLink';

const StyledLink = styled(KnowledgeBaseLink)`
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
    <StyledLink kbUrl="https://support.hoxhunt.com/" linkId="" {...restProps}>
      {withIcon && (
        <HoxIcon.ExternalLink size={1.25} color={palette(p => p.cta.primary)} />
      )}
      <ButtonText>{children}</ButtonText>
    </StyledLink>
  );
};
