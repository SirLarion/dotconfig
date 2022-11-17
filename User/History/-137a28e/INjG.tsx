import React, { FC } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { Body, Heading2 } from '@hox/ui/Text';

import { Header, HeaderContent } from '../../../../components/Header';

export interface IDashboardHeaderProps {}

const StyledDashboardHeader = styled(Header)``;

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
      >
        <Heading2></Heading2>
        <Body>This is the Admin app, only good vibes allowed in here</Body>
      </HeaderContent>
    </StyledDashboardHeader>
  );
};
