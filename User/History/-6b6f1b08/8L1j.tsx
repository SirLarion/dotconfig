import React, { FC } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  Game,
  USER_GAME_DEACTIVATION_REASON,
} from '@hox/frontend-utils/types/graphql.generated';
import { Blocks } from '@hox/ui/Blocks';
import { palette } from '@hox/ui/styles/theme';
import { Tag } from '@hox/ui/Tags';
import { SmallText } from '@hox/ui/Text';
import { Tooltip } from '@hox/ui/Tooltip';

export interface IUserTrainingStatusTagProps
  extends Pick<Game, 'active' | 'deactivationReason'> {}

const INTL = {
  active: (
    <FormattedMessage
      id="app.admin.user.trainingStatus.on.title"
      defaultMessage="On"
      description="Value for when user's game is set to active"
    />
  ),
  notActive: (
    <FormattedMessage
      id="app.admin.user.trainingStatus.off.title"
      defaultMessage="Off"
      description="Value for when user's game is set to not active"
    />
  ),
  emailUnreachable: {
    value: (
      <FormattedMessage
        id="app.admin.user.status.emailUnreachable.title"
        defaultMessage="Email unreachable"
        description="Title for field showing user's email is unreachable"
      />
    ),
    description: (
      <FormattedMessage
        id="app.admin.user.status.emailUnreachable.description"
        defaultMessage="User's training has been paused due to their email being unreachable"
        description="Tooltip for field showing user's email is unreachable"
      />
    ),
  },
};

const TagStyled = styled(Tag)`
  display: inline-flex;
  text-transform: uppercase;
  font-weight: 600;
`;

export const UserTrainingStatusTag: FC<IUserTrainingStatusTagProps> = ({
  active,
  deactivationReason,
  ...restProps
}) => {
  if (active) {
    return (
      <TagStyled
        disableAnimations
        size="small"
        foregroundColor={palette(p => p.accent.positive)}
        background={palette(p => p.accent.positive.ghosted)}
        {...restProps}
      >
        {INTL.active}
      </TagStyled>
    );
  }

  return (
    <Blocks.HorizontalGroup gap="tiny">
      <TagStyled
        disableAnimations
        size="small"
        foregroundColor={palette(p => p.accent.boring)}
        background={palette(p => p.accent.boring.ghosted)}
        {...restProps}
      >
        {INTL.notActive}
      </TagStyled>
      {deactivationReason ===
        USER_GAME_DEACTIVATION_REASON.USER_EMAIL_UNREACHABLE && (
        <Tooltip
          width={15}
          position="above"
          tooltipBoxChildren={
            <SmallText>{INTL.emailUnreachable.description}</SmallText>
          }
        >
          <TagStyled
            disableAnimations
            size="small"
            foregroundColor={palette(p => p.accent.danger)}
            background={palette(p => p.accent.danger.ghosted)}
            {...restProps}
          >
            {INTL.emailUnreachable.value}
          </TagStyled>
        </Tooltip>
      )}
    </Blocks.HorizontalGroup>
  );
};
