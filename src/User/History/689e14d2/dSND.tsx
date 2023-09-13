import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'ramda';
import { animated, useSpring } from 'react-spring/dist';
import { useRecoilValue } from 'recoil';

import { AnimatedResizingContent } from '@hox/ui/AnimatedResizingContent';
import { Button } from '@hox/ui/Button';
import { LoadingIndicator } from '@hox/ui/LoadingIndicator';
import { Body, ButtonText } from '@hox/ui/Text';

import { BUTTON_INTL } from '../../../../intl/generic';
import { ColumnLayoutPreview } from '../../../../views/UserManagementBeta/columnCustomization/components/ColumnLayoutPreview';
import { columnLayoutState } from '../../../../views/UserManagementBeta/columnCustomization/recoil';
import { InfoBlock } from '../../../InfoBlock';
import { USER_ACTION_INTL as INTL } from '../../intl';
import { userActionState } from '../../recoil';
import { Blocks } from '../Blocks';

import { mapTableColumnsToExportables, MAX_USERS_FOR_FAST_EXPORT } from './lib';
import { useGenerateExport } from './useGenerateExport';

export interface IExportUserCSVProps {
  onActionFinish: () => void;
  onActionCancel: () => void;
}

const StyledExportUserCSV = styled.div`
  > :not(:last-child) {
    margin-bottom: 1rem;
  }

  > :last-child {
    padding-top: 1rem;
  }
`;

const Content = styled(AnimatedResizingContent)`
  width: 40rem;
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

const ColumnSelection = styled(ColumnLayoutPreview)`
  width: 100%;
  padding: 0 1rem 1rem 1rem;
  > div {
    width: 100%;
    height: 22rem;
    flex-wrap: wrap;
  }
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

const ExportManyConfirmation: FC<{ loading: boolean; close: () => void }> = ({
  loading,
  close,
}) => {
  const spring = useSpring({
    delay: 500,
    from: { opacity: 0, transform: 'translate3d(0, 1rem, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0rem, 0)' },
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <animated.div style={spring}>
      <Body>{INTL.exportCsv.mailSend}</Body>
      <CloseButton onClick={close}>{BUTTON_INTL.close}</CloseButton>
    </animated.div>
  );
};

export const ExportUserCSV: FC<IExportUserCSVProps> = ({
  onActionFinish,
  onActionCancel,
  ...restProps
}) => {
  const userCount = useRecoilValue(userActionState.taskCount);
  const { runGenerateExport, loading } = useGenerateExport();
  const tableColumns = useTableColumns();

  const [selectedColumns, setSelected] = useState(tableColumns);
  const [confirmed, setConfirmed] = useState(false);

  const isManyUsers = userCount > MAX_USERS_FOR_FAST_EXPORT;

  return (
    <StyledExportUserCSV {...restProps}>
      <Content>
        {confirmed && isManyUsers ? (
          <ExportManyConfirmation loading={loading} close={onActionFinish} />
        ) : (
          <>
            <Description>
              <ButtonText>{INTL.exportCsv.title(userCount)}</ButtonText>
              {isManyUsers && (
                <InfoBlock type="warning">{INTL.exportCsv.noteLarge}</InfoBlock>
              )}
            </Description>
            <ChooseColumnsText>{INTL.exportCsv.description}</ChooseColumnsText>
            <ColumnSelection
              selectedColumnIds={selectedColumns}
              setSelectedColumnIds={setSelected}
              custom
            />
            <Buttons
              onActionConfirm={() => {
                setConfirmed(true);
                runGenerateExport(
                  mapTableColumnsToExportables(selectedColumns)
                );
              }}
              onActionCancel={onActionCancel}
              confirmButtonDisabled={isEmpty(selectedColumns) || confirmed}
            />
          </>
        )}
      </Content>
    </StyledExportUserCSV>
  );
};
