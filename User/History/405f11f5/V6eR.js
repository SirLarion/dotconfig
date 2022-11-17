import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'recompose';
import get from 'lodash/get';
import QuestLanguageSelector from '../../components/QuestLanguageSelector';
import {
  GetCurrentUserQuestLocalesDocument,
  SetCurrentUserQuestLocalesDocument,
} from './__generated__/QuestLocales.generated';

const extractUserDomain = currentUser => {
  if (currentUser == null) {
    return;
  }

  const organization = currentUser.organization;
  const [, userDomain] = currentUser.emails[0].address.split('@');
  const domain = organization.domains.find(d => d.name === userDomain);
  return domain;
};

export const currentUserQueryConf = {
  props: ({ data: { currentUser } }) => {
    const domain = extractUserDomain(currentUser);
    return {
      value: get(currentUser, 'profile.locale.quests', []),
      userId: get(currentUser, '_id'),
      allowedSimulationLanguages: get(domain, 'allowedSimulationLanguages'),
    };
  },
};

export const updateUserMutationConf = {
  props: ({ mutate, ownProps }) => {
    const getUserInput = quests => {
      return {
        user: { _id: ownProps.userId, profile: { locale: { quests } } },
      };
    };
    return {
      onChange: questLocales =>
        mutate({ variables: getUserInput(questLocales) }),
    };
  },
};

export default compose(
  graphql(CURRENT_USER_QUERY, currentUserQueryConf),
  graphql(UPDATE_USER_QUEST_LOCALES, updateUserMutationConf)
)(QuestLanguageSelector);
