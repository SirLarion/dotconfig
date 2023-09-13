import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { Body } from '@hox/ui/Text';

import { linkStyles } from '../../../../../../../components/Link';
import { ExampleModal } from '../ExampleModal';
import { useQuestTemplatePreviewQuery } from '../../../../../../TrainingManagement/questTemplate/hooks/useQuestTemplatePreview/graphql/__generated__/QuestTemplateQuery.generated';
import { QuestTemplate } from '../../../../../../TrainingManagement/questTemplate/Preview/components/Template';

const StyledViewExampleButton = styled.div``;

const StyledBody = styled(Body)`
  ${linkStyles}
  max-width: 60rem;
  white-space: break-spaces;
`;

const ViewExampleContainer = styled.div`
  cursor: pointer;
  display: inline-flex;
  > :last-child {
    margin-left: 0.75rem;
  }
`;

export interface IViewExampleButtonProps {
  exampleQuestId: string;
}

export const ViewExampleButton: FC<IViewExampleButtonProps> = ({
  exampleQuestId,
}) => {
  const [showExample, setShowExample] = useState(false);
  const { questTemplate, questTemplatePreview, templateLoading } =
    useQuestTemplatePreviewQuery({ questId: exampleQuestId });
  return (
    <>
      <StyledViewExampleButton>
        <ViewExampleContainer onClick={() => setShowExample(true)}>
          <HoxIcon.View color={palette(p => p.cta.primary)} />
          <StyledBody dimmed>
            <FormattedMessage
              id="app.admin.organization.domain.setting.form.informationExample"
              defaultMessage="See example of how we use this information"
              description="Text for clickable area that opens an example picture to show example on how the information above is used"
            />
          </StyledBody>
        </ViewExampleContainer>
      </StyledViewExampleButton>
      <QuestTemplate
      <ExampleModal
        visible={showExample}
        onClose={() => setShowExample(false)}
      />
    </>
  );
};
