import React, { FC } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { palette } from '@hox/ui/styles/theme';

import { Header, HeaderContent } from '../../../../components/Header';

export interface IDashboardHeaderProps {}

const StyledDashboardHeader = styled(Header)`
  background-color: ${palette(p => p.background.base)};
`;

export const DashboardHeader: FC<IDashboardHeaderProps> = ({
  ...restProps
}) => {
  const { profile } = useCurrentUser();

  return (
    <StyledDashboardHeader {...restProps}>
      <HeaderContent
        mainHeading={
          <FormattedMessage
            id="app.admin.dashboard.heading.title"
            defaultMessage="Welcome {adminName},"
            description="Heading title for the admin dashboard view welcoming the admin."
            values={{
              adminName: profile.firstName,
            }}
          />
        }
        subHeading={'This is the Admin app, only good vibes allowed in here'}
      />
    </StyledDashboardHeader>
  );
};
