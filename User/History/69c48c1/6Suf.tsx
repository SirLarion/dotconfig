import styled, { css } from 'styled-components';
import { Link as ReactRouterDomLink } from 'react-router-dom';

import { palette } from '@hox/ui/styles/theme';

export const linkStyles = css`
  text-decoration: none;
  color: ${palette(p => p.cta.primary)} !important;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const Link = styled.a.attrs({
  rel: 'noopener noreferrer"',
  target: '_blank',
})`
  ${linkStyles};
`;

export const RouterLink = styled(ReactRouterDomLink)`
  ${linkStyles};
`;

export const IconTextRouterLink = styled(ReactRouterDomLink)`
  display: flex;
  align-items: center;
  text-decoration: none;

  > * {
    ${linkStyles};
  }

  > :first-child {
    margin-right: 0.5rem;
  }
`;
