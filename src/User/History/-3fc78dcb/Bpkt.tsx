import React from 'react';

import { FormattedMessage } from 'react-intl';

import { QuestTemplateQuery } from './QuestTemplateQuery';
import { Autocomplete } from '../../components/Autocomplete/Autocomplete';
import { TQtFilter } from './models';
import { GetQuestTemplateTagsDocument } from './__generated__/GetQuestTemplateTags.generated';

type TQuestTemplateSelectorProps = {
  onChange: (val: string) => unknown;
  label?: React.ReactNode;
  itemFilter?: TQtFilter;
  name?: string;
};

const DefaultLabel: React.FC = () => (
  <FormattedMessage
    id="app.form.questTemplateTag"
    defaultMessage="Quest Template Tag"
    description="Label for a field that is used to select a quest template tag"
  />
);

export const QuestTemplateSelector: React.FC<TQuestTemplateSelectorProps> = ({
  label = <DefaultLabel />,
  itemFilter,
  ...props
}) => (
  <QuestTemplateQuery
    query={GetQuestTemplateTagsDocument}
    variables={{ filter: itemFilter }}
  >
    {({ data }) => (
      <Autocomplete
        label={label}
        {...props}
        items={data.questTemplates.map(({ tag }) => tag)}
      />
    )}
  </QuestTemplateQuery>
);