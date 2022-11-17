import React from 'react';
import { Enzyme } from '../../../npm/Enzyme';

import {
  getContext,
  mountWithIntl,
  getApolloContextDef,
  getThemeContextDef,
  getSchema,
  matchText,
  matchTestId,
  timeout,
} from '../../../utils/testUtils';
import Table from '../../../components/ui/Table/Table';
import QuestTemplateList from '../QuestTemplateList';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserContext } from '@hox/frontend-utils/providers/currentUser';
import { GetQuestTemplateListQuery } from '../__generated__/GetQuestTemplatesQuery.generated';

type IQuestTemplateListItem =
  GetQuestTemplateListQuery['questTemplates'][number];

describe('<QuestTemplateList />', () => {
  const getQuestTemplate = (
    overrides?: Partial<IQuestTemplateListItem>
  ): IQuestTemplateListItem => ({
    _id: Math.random().toString(),
    tag: 'hox.quest.bootcamp.5',
    softDeletedAt: null,
    isActive: Math.random() > 0.5 ? true : false,
    emailTemplate: {
      email: {
        subject: 'subject',
        attachments: [{ filename: 'filename' }],
      },
    },
    attributes: {
      language: 'fi',
    },
    tags: [
      {
        name: 'tag',
        categoryName: 'category',
      },
    ],
    createdAt: new Date(),
    ...overrides,
  });

  const mockedCurrentUser = {
    isSuperAdmin: true,
  };

  const setup = async (questTemplates: IQuestTemplateListItem[]) => {
    const schema = getSchema({
      resolvers: {
        RootQuery: {
          questTemplates: () => questTemplates,
        },
      },
    });
    const wrapper = mountWithIntl(
      <CurrentUserContext.Provider value={mockedCurrentUser as any}>
        <BrowserRouter>
          <QuestTemplateList />
        </BrowserRouter>
      </CurrentUserContext.Provider>,
      getContext(
        getThemeContextDef(),

        getApolloContextDef({ schema })
      )
    );
    // Wait for GQL to resolve
    await timeout(0);
    wrapper.update();

    return { wrapper };
  };

  afterEach(() => {
    Enzyme.unmountAll();
  });

  it('should render Add button & a table', async () => {
    const { wrapper } = await setup([]);

    expect(
      wrapper.findWhere(matchTestId('add-qt-button')).length
    ).toBeGreaterThan(0);
    expect(
      wrapper.findWhere(matchTestId('sort-latest-button')).length
    ).toBeGreaterThan(0);
    expect(wrapper.find(Table).length).toBeGreaterThan(0);
  });

  it('should render correct data for each Quest Template', async () => {
    const questTemplates = [
      getQuestTemplate({ isActive: false }),
      getQuestTemplate({ isActive: true }),
    ];

    const { wrapper } = await setup(questTemplates);

    questTemplates.forEach(qt => {
      expect(
        wrapper.findWhere(matchText(qt.tag.split('hox.quest.')[1])).length
      ).toBeGreaterThan(0);

      expect(
        wrapper.findWhere(matchText(qt.emailTemplate.email.subject)).length
      ).toBeGreaterThan(0);

      qt.tags.forEach(({ categoryName, name }) => {
        expect(
          wrapper.findWhere(matchText(`${categoryName}: ${name}`)).length
        ).toBeGreaterThan(0);
      });

      expect(
        wrapper.findWhere(matchTestId('attachments-count')).length
      ).toBeGreaterThan(0);

      expect(
        wrapper.findWhere(matchText(qt.attributes.language)).length
      ).toBeGreaterThan(0);

      expect(
        wrapper.findWhere(
          w => w.length && w.prop('to') === `/questTemplates/${qt._id}`
        ).length
      ).toBeGreaterThan(0);
    });
  });
});
