import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
} from 'react-router-dom';
import { animated, useTransition } from 'react-spring/dist';

import { useIsClickingOutsideElement } from '@hox/frontend-utils/hooks/useIsClickingOutsideElement';
import { SUPPORTED_LOCALE } from '@hox/frontend-utils/types/graphql.generated';
import { LoadingIndicator } from '@hox/ui/LoadingIndicator';
import { Overlay } from '@hox/ui/Overlay';
import { Portal } from '@hox/ui/Portal';
import { useSidenavWidth } from '@hox/ui/Sidenav';
import { palette, themeLight } from '@hox/ui/styles/theme';

import { TRAINING_MANAGEMENT_PATH } from '../../../../layouts/paths';
import { AnimatedPanel } from '../components/AnimatedPanel';
import { Deactivation } from '../Deactivation';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useCurrentUserOrganization } from '../hooks/useCurrentUserOrganization';
import { useQuestTemplatePreview } from '../hooks/useQuestTemplatePreview';

import { QuestTemplateInformation } from './components/QuestTemplateInformation';
import { QuestTemplate } from './components/Template';

const TIMEOUT = 300;

const StyledQuestTemplatePreview = styled.div<{ $sidenavWidthRem: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: ${props => props.$sidenavWidthRem}rem;
  box-sizing: border-box;
  position: relative;
`;

const StyledOverlay = styled(Overlay)`
  background-color: ${palette(p => p.foreground.primary.ghosted)};
`;

const AbsoluteWrapper = styled.div`
  position: absolute;
  width: 100%;
`;

const LoadingIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export interface IQuestTemplatePreviewProps
  extends RouteComponentProps<{ questId: string }> {
  selectedLanguage: SUPPORTED_LOCALE;
}

export const QuestTemplatePreview: FC<IQuestTemplatePreviewProps> = ({
  history,
  match: {
    params: { questId },
  },
  selectedLanguage,
}) => {
  const { sidenavWidthRem } = useSidenavWidth();

  const previewRef = useRef<HTMLDivElement | null>(null);
  const questTemplateRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  const location = useLocation();
  useBodyScrollLock(previewRef);

  const { organization, loading: isOrganizationLoading } =
    useCurrentUserOrganization();

  const [language, setLanguage] = useState(selectedLanguage);

  const { questTemplate, questTemplatePreview, templateLoading } =
    useQuestTemplatePreview(questId, language);

  const loading = isOrganizationLoading || templateLoading;

  const clickedOutside = useIsClickingOutsideElement(
    useMemo(() => [questTemplateRef, panelRef], [])
  );

  useLayoutEffect(() => {
    if (clickedOutside) {
      setVisible(false);
    }
  }, [clickedOutside, setVisible]);

  useEffect(() => {
    if (visible) {
      return;
    }

    // Wait for animations to finish
    setTimeout(() => {
      history.push(TRAINING_MANAGEMENT_PATH);
    }, TIMEOUT);
  }, [visible, history]);

  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 1, transform: 'translate(2rem, 0)' },
    enter: { opacity: 1, transform: 'translate(0rem, 0)' },
    leave: { opacity: 1, transform: 'translate(-2rem, 0)' },
    config: {
      tension: 220,
      friction: 30,
      precision: 0.003,
      clamp: true,
    },
  });

  const handleKeyPress = (key: string) => {
    if (key === 'Escape') {
      setVisible(false);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('keydown', ({ key }) => handleKeyPress(key), false);

    return () => {
      window.removeEventListener(
        'keydown',
        ({ key }) => handleKeyPress(key),
        false
      );
    };
  }, []);

  return (
    <ThemeProvider theme={themeLight}>
      <Portal style={{ zIndex: '40' }}>
        <StyledOverlay visible={visible} overlayRef={previewRef}>
          <StyledQuestTemplatePreview $sidenavWidthRem={sidenavWidthRem}>
            <QuestTemplate
              loading={loading}
              questTemplatePreview={questTemplatePreview}
              visible={visible}
              setVisible={setVisible}
              questTemplateRef={questTemplateRef}
            />
            <AnimatedPanel visible={visible} panelRef={panelRef}>
              {loading ? (
                <LoadingIndicatorWrapper>
                  <LoadingIndicator />
                </LoadingIndicatorWrapper>
              ) : (
                <>
                  {transitions.map(({ item, props, key }) => (
                    <animated.div key={key} style={props}>
                      <Switch location={item}>
                        {questTemplate && (
                          <>
                            <Route
                              path={`${TRAINING_MANAGEMENT_PATH}/:questId/deactivate`}
                              render={routeProps => (
                                <AbsoluteWrapper>
                                  <Deactivation
                                    questTemplateTag={questTemplate.tag}
                                    {...routeProps}
                                  />
                                </AbsoluteWrapper>
                              )}
                            />

                            <Route
                              exact
                              path={`${TRAINING_MANAGEMENT_PATH}/:questId`}
                              render={routeProps => (
                                <AbsoluteWrapper>
                                  <QuestTemplateInformation
                                    questTemplate={questTemplate}
                                    organization={organization}
                                    setPreviewLanguage={setLanguage}
                                    selectedLanguage={language}
                                    {...routeProps}
                                  />
                                </AbsoluteWrapper>
                              )}
                            />
                          </>
                        )}
                      </Switch>
                    </animated.div>
                  ))}
                </>
              )}
            </AnimatedPanel>
          </StyledQuestTemplatePreview>
        </StyledOverlay>
      </Portal>
    </ThemeProvider>
  );
};
