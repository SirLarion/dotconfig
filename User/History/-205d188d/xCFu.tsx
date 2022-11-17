import React from 'react';
import get from 'lodash/get';
import CurrentUserEmailQuery from './CurrentUserEmailQuery';
import SendQuestsToEmailsMutation from './SendQuestToEmailMutation';
import { EQuestOrigin } from '../../models/quest';
import { GetCurrentUserEmailDocument } from './graphql/__generated__/GetCurrentUserEmail.generated';

export const SendQuestToCurrentUserContainer: React.SFC = props => (
  <CurrentUserEmailQuery query={GetCurrentUserEmailDocument}>
    {({ error, data }) => {
      if (error) {
        throw error;
      }

      const email = get(data, 'currentUser.emails.0.address') as string;
      return (
        <SendQuestsToEmailsMutation mutation={SEND_QUESTS_TO_EMAILS}>
          {sendQuestsToEmails => {
            if (typeof props.children === 'function') {
              return props.children((questTag: string) =>
                sendQuestsToEmails({
                  variables: {
                    emails: [email],
                    questTags: [questTag],
                    origin: EQuestOrigin.EDITOR,
                  },
                })
              );
            }
          }}
        </SendQuestsToEmailsMutation>
      );
    }}
  </CurrentUserEmailQuery>
);
