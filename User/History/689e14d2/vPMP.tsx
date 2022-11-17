import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'ramda';
import { useRecoilValue } from 'recoil';

import { AnimatedResizingContent } from '@hox/ui/AnimatedResizingContent';
import { Button } from '@hox/ui/Button';
import { ISearchToken } from '@hox/ui/Search/models';
import { Body, ButtonText } from '@hox/ui/Text';

import { BUTTON_INTL } from '../../../../intl/generic';
import { ColumnLayoutPreview } from '../../../../views/UserManagement/columnCustomization/components/ColumnLayoutPreview';
import { columnLayoutState } from '../../../../views/UserManagement/columnCustomization/recoil';
import { InfoBlock } from '../../../InfoBlock';
import { USER_ACTION_INTL as INTL } from '../../intl';
import { userActionState } from '../../recoil';
import { Blocks } from '../Blocks';

import { mapTableColumnsToExportables, MAX_USERS_FOR_FAST_EXPORT } from './lib';
import { useGenerateExport } from './useGenerateExport';

export interface IExportUserCSVProps {
  onActionFinish: () => void;
  onActionCancel: () => void;
  searchTokens?: ISearchToken[];
}

const StyledExportUserCSV = styled.div`
  width: 40rem;

  > :not(:last-child) {
    margin-bottom: 1rem;
  }

  > :last-child {
    padding-top: 1rem;
  }
`;

const Content = styled(AnimatedResizingContent)`
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  > * {
    margin-bottom: 1rem;
  }
`;

const ChooseColumnsText = styled(Body)`
  margin: 2rem 0;
`;

const SelectionWrapper = styled.section`
  height: 25rem;
  overflow-y: scroll;
`;

const ColumnSelection = styled(ColumnLayoutPreview)`
  padding: 0 1rem;
`;

const Buttons = styled(Blocks.CTAButtons)`
  justify-content: flex-end;
`;

const CloseButton = styled(Button)`
  margin-top: 1rem;
  float: right;
`;

const useTableColumns = () => {
  const layoutName = useRecoilValue(columnLayoutState.appliedColumnLayoutName);
  const columns = useRecoilValue(columnLayoutState.columnLayout(layoutName));
  return columns;
};

export const ExportUserCSV: FC<IExportUserCSVProps> = ({
  onActionFinish,
  onActionCancel,
  ...restProps
}) => {
  const userCount = useRecoilValue(userActionState.taskCount);
  const { runGenerateExport } = useGenerateExport();
  const tableColumns = useTableColumns();

  const [selectedColumns, setSelected] = useState(tableColumns);
  const [confirmed, setConfirmed] = useState(false);

  const isManyUsers = userCount > MAX_USERS_FOR_FAST_EXPORT;
  return (
    <StyledExportUserCSV {...restProps}>
      <Content>
        {confirmed && isManyUsers ? (
          <div>
            <Body>{INTL.exportCsv.mailSend}</Body>
            <CloseButton onClick={onActionFinish}>
              {BUTTON_INTL.close}
            </CloseButton>
          </div>
        ) : (
          <>
            <Description>
              <ButtonText>{INTL.exportCsv.title(userCount)}</ButtonText>
              {isManyUsers && (
                <InfoBlock type="warning">{INTL.exportCsv.noteLarge}</InfoBlock>
              )}
            </Description>
            <ChooseColumnsText>{INTL.exportCsv.description}</ChooseColumnsText>
            <SelectionWrapper>
              <ColumnSelection
                selectedColumnIds={selectedColumns}
                setSelectedColumnIds={setSelected}
                custom
              />
            </SelectionWrapper>
            <Buttons
              onActionConfirm={() => {
                setConfirmed(true);
                runGenerateExport(
                  mapTableColumnsToExportables(selectedColumns)
                );
              }}
              onActionCancel={onActionCancel}
              confirmButtonDisabled={isEmpty(selectedColumns)}
            />
          </>
        )}
      </Content>
    </StyledExportUserCSV>
  );
};
