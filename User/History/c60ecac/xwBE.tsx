import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, Theme } from '@material-ui/core/styles';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button/Button';
import { createStyleProvider } from '../../components/ui/Style/createStyled';
import { Page, PageHeader, PageContent } from '../../components/ui/Page/Page';
import { QuestTemplateIcon } from '../../components/ui/icons';
import { Panel, PanelContent } from '../../components/ui/Panel/Panel';
import { FormattedMessage } from 'react-intl';
import { NavigationIntl } from '../../components/Navigation/navigationItems';
import { Intl } from '../../utils/clientIntl';
import { SortableQuestTemplateTable } from './SortableQuestTemplateTable';
import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { useGetQuestTemplateListQuery } from './__generated__/GetQuestTemplatesQuery.generated';

const Styles = (theme: Theme) =>
  createStyles({
    addButtonIcon: {
      marginRight: theme.spacing(1),
    },
    table: {
      tableLayout: 'fixed',
    },
    tagCell: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    tagsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: `0 -${theme.spacing(1) / 2}px`,
    },
    tagItem: {
      margin: `${theme.spacing(1) / 2}px`,
    },
    attachmentContainer: {
      display: 'inline-flex',
    },
    attachmentIcon: {
      height: '16px',
      width: '16px',
    },
    sortContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

const StyleProvider = createStyleProvider(Styles);

export const QuestTemplateList = () => {
  const { isSuperAdmin } = useCurrentUser();
  const { data, loading } = useGetQuestTemplateListQuery();

  if (loading) {
    return null;
  }

  const questTemplates = data.questTemplates || [];

  return (
    <StyleProvider>
      {style => (
        <Page>
          <PageHeader icon={<QuestTemplateIcon />}>
            <FormattedMessage {...NavigationIntl.questTemplates} />
          </PageHeader>
          <PageContent>
            <Panel>
              <PanelContent>
                {isSuperAdmin && (
                  <Link
                    to="/questTemplates/create"
                    data-test-id="add-qt-button"
                  >
                    <Button variant="text" color="secondary">
                      <AddCircleOutline
                        className={style.classes.addButtonIcon}
                      />
                      <FormattedMessage {...Intl.actionAdd} />
                    </Button>
                  </Link>
                )}
                <SortableQuestTemplateTable
                  templates={questTemplates}
                  style={style}
                />
              </PanelContent>
            </Panel>
          </PageContent>
        </Page>
      )}
    </StyleProvider>
  );
};

export default QuestTemplateList;
