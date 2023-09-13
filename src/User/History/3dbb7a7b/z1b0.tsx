import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { CloseButton } from '@hox/ui/CloseButton';
import { palette } from '@hox/ui/styles/theme';
import { Body, Heading3, SmallTextStrong } from '@hox/ui/Text';

import { PortalOverlay } from '../../../components/PortalOverlay';
import { TColumnId } from '../types';

import { ColumnLayoutDialog } from './components/ColumnLayoutDialog';
import { ColumnLayoutDialogButtons } from './components/ColumnLayoutDialogButtons';
import { ColumnLayoutOrdering } from './components/ColumnLayoutOrdering';
import { ColumnLayoutPreview } from './components/ColumnLayoutPreview';
import { ColumnLayoutSelector } from './components/ColumnLayoutSelector';
import { AVAILABLE_COLUMNS } from './constants/columns';
import { useColumnCustomizationAnalytics } from './hooks/useColumnCustomizationAnalytics';
import { useColumnLayout } from './hooks';
import { COLUMN_CUSTOMIZATION_INTL as INTL } from './intl';
import { sortByIndex } from './lib';
import { columnLayoutState } from './recoil';

const MAX_COLUMN_COUNT = 6;

const DialogHeader = styled.div`
  border-bottom: 1px ${palette(p => p.foreground.primary.ghosted)} solid;
  padding: 2rem;
  padding-left: 3rem;
`;

const DialogHeaderTop = styled.div`
  display: grid;
  grid-template-columns: 95% 5%;

  // CloseButton
  > :nth-child(2) {
    justify-self: flex-end;
  }
`;

const MidContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-grow: 1;
  height: 100%;
  height: 33rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 2rem 3rem;
`;

const SelectedColumnsText = styled(SmallTextStrong)`
  text-align: right;
  margin-bottom: 1rem;
`;

const getSelectedColumnsTextColor = (selectedColumnsCount: number) => {
  if (selectedColumnsCount === MAX_COLUMN_COUNT) {
    return palette(p => p.cta.primary);
  }
  if (selectedColumnsCount === 0) {
    return palette(p => p.accent.danger);
  }
  return palette(p => p.foreground.primary);
};

export const ColumnCustomizationOverlay: FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen, ...restProps }) => {
  const [appliedColumnLayoutName, setAppliedColumnLayoutName] = useRecoilState(
    columnLayoutState.appliedColumnLayoutName
  );

  const [currentlySelectedLayoutName, setCurrentlySelectedLayoutName] =
    useState(appliedColumnLayoutName);

  const {
    appliedColumnIds,
    setAppliedColumnIds,
    loadLayoutsFromLocalStorage,
    columnLayoutNames,
    isCustomLayout,
  } = useColumnLayout(currentlySelectedLayoutName);

  // We need local state of isCustomLayout to prevent UI flickering
  const [isCustomLayoutDelayed, setIsCustomLayoutDelayed] =
    useState(isCustomLayout);

  const [selectedColumnIds, setSelectedColumnIds] =
    useState<TColumnId[]>(appliedColumnIds);

  const trackCustomization = useColumnCustomizationAnalytics();

  const isSaveDisabled = selectedColumnIds.length === 0;

  const selectedColumns = selectedColumnIds.map(col => AVAILABLE_COLUMNS[col]);

  const handleOnSaveAndUseLayout = useCallback(() => {
    const sortedColumnIds = sortByIndex(selectedColumnIds);
    setAppliedColumnIds(selectedColumnIds);
    setAppliedColumnLayoutName(currentlySelectedLayoutName);

    trackCustomization(
      currentlySelectedLayoutName,
      sortedColumnIds,
      isCustomLayout
    );
    setOpen(false);
  }, [
    setOpen,
    trackCustomization,
    setAppliedColumnIds,
    setAppliedColumnLayoutName,
    selectedColumnIds,
    currentlySelectedLayoutName,
    isCustomLayout,
  ]);

  useEffect(() => {
    setSelectedColumnIds(appliedColumnIds);
    setIsCustomLayoutDelayed(isCustomLayout);
  }, [setSelectedColumnIds, appliedColumnIds, isCustomLayout]);

  useEffect(() => {
    if (open) {
      setCurrentlySelectedLayoutName(appliedColumnLayoutName);
      loadLayoutsFromLocalStorage();
    }
  }, [
    open,
    loadLayoutsFromLocalStorage,
    appliedColumnLayoutName,
    setCurrentlySelectedLayoutName,
  ]);

  return (
    <PortalOverlay
      visible={open}
      onOutsideClick={() => setOpen(false)}
      {...restProps}
    >
      <ColumnLayoutDialog open={open}>
        <DialogHeader>
          <DialogHeaderTop>
            <Heading3>{INTL.title}</Heading3>
            <CloseButton visible onClick={() => setOpen(false)} />
            <Body dimmed>{INTL.description}</Body>
          </DialogHeaderTop>

          <ColumnLayoutSelector
            layoutNames={columnLayoutNames}
            selectedLayoutName={currentlySelectedLayoutName}
            currentlyUsedLayoutName={appliedColumnLayoutName}
            onLayoutSelect={name => {
              setCurrentlySelectedLayoutName(name);
            }}
          />
        </DialogHeader>
        <MidContainer>
          <ColumnLayoutPreview
            selectedColumnIds={selectedColumnIds}
            setSelectedColumnIds={setSelectedColumnIds}
            maxColumnCount={MAX_COLUMN_COUNT}
            custom={isCustomLayoutDelayed}
          />
          <RightColumn>
            {isCustomLayoutDelayed && (
              <div>
                <SelectedColumnsText
                  color={getSelectedColumnsTextColor(selectedColumns.length)}
                >{`${selectedColumns.length} / ${MAX_COLUMN_COUNT} columns selected`}</SelectedColumnsText>
                <ColumnLayoutOrdering
                  selectedColumnIds={selectedColumnIds}
                  onLayoutReorder={newOrder => {
                    setSelectedColumnIds(newOrder);
                  }}
                />
              </div>
            )}
            <ColumnLayoutDialogButtons
              isCustomLayout={isCustomLayoutDelayed}
              isSaveDisabled={isSaveDisabled}
              setOpen={setOpen}
              handleOnSaveLayout={() => setAppliedColumnIds(selectedColumnIds)}
              handleOnSaveAndUseLayout={() => handleOnSaveAndUseLayout()}
            />
          </RightColumn>
        </MidContainer>
      </ColumnLayoutDialog>
    </PortalOverlay>
  );
};
