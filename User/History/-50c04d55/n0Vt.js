import React, { useState, useEffect, lazy } from 'react';
import PropTypes from '../../utils/propTypes';
import { Row, Col } from 'react-flexbox-grid';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { FormattedMessage, defineMessages } from 'react-intl';
import { SearchField } from '../../components/SearchField/SearchField';
import { WorkQueue } from './components/WorkQueue';
import { ThreatFilterOptionIconMenu } from './components/ThreatFilterOptionIconMenu/ThreatFilterOptionIconMenu';
import { UserReportedAsFilterDropdown } from './components/UserReportedAsFilter/UserReportedAsFilterView';
import { EThreatSeverityGroup } from './components/ThreatFilterOptionIconMenu/models';
import { QuickRating } from './components/QuickRating';
import { withRouter } from 'react-router-dom';
import {
  compose,
  injectStyles,
  injectAnalytics,
} from '../../components/higherOrderComponents';
import { OrganizationSelector } from '../../components/OrganizationSelector/OrganizationSelectorContainer';
import OnlySuperAdmin from '../../components/OnlySuperAdmin/OnlySuperAdmin';
import get from 'lodash/get';
import { EClientEvent } from '../../models/analytics';
import { ThreatFeedSunsetModal } from '../../components/SunsetModals/Response/ThreatFeedSunsetModal';

const useMediaQuery = query => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });
  return matches;
};

const RateThreatContainerView = lazy(() =>
  import('../../modules/RateThreat/RateThreatContainer')
);

const Intl = defineMessages({
  searchFieldHint: {
    id: 'app.modules.threat.searchHint',
    defaultMessage: 'Search threats',
    description:
      'A placeholder for an input field with which one can search threats',
  },
});

const Styles = ({ appBar, toolbar }) => {
  const toolbarMarginTop = 8;
  const toolbarMarginBottom = 16;
  const appBarHeight = appBar.height + appBar.borderTopHeight + 90; // top bar border and padding taken into consideration
  const toolbarHeight = toolbar.height;

  return {
    toolbar: {
      marginBottom: `${toolbarMarginBottom}px`,
      marginTop: `${toolbarMarginTop}px`,
    },
    toolbarSearchField: {
      width: '300px',
      margin: '0 24px 0 8px',
    },
    toolbarFilter: {
      marginLeft: '12px',
    },
    toolbarQuickRating: {
      marginTop: '4px',
      marginLeft: '24px',
      marginRight: '-12px',
    },
    workQueueList: isSmallLaptop => ({
      height: isSmallLaptop
        ? '500px'
        : `calc(100vh - ${
            appBarHeight +
            toolbarHeight +
            toolbarMarginBottom +
            toolbarMarginTop
          }px)`,
      minHeight: '500px',
      padding: 0,
    }),
    workQueueListContainer: {
      position: 'relative',
      minHeight: '500px',
    },
    childContainer: {
      height: `calc(100vh - ${
        appBarHeight + toolbarHeight + toolbarMarginBottom + toolbarMarginTop
      }px)`,
    },
  };
};

const PROP_TYPES = {
  styles: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  analytics: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const createSyncQueryStringWithFilterParams = router => params => {
  router.push({
    ...router.location,
    query: {
      ...router.location.query,
      ...params,
    },
  });
};

const RateThreatIndexView = ({
  styles,
  location,
  match,
  history,
  analytics,
}) => {
  const params = match.params;
  const router = {
    location,
    params,
    push: history.push,
  };
  const queryParams = get(router, 'location.query', {});
  const syncQueryParams = createSyncQueryStringWithFilterParams(router);

  const [searchText, setSearchText] = useState(queryParams.searchText);
  const [organizationIdFilter, setOrganizationIdFilter] = useState(
    queryParams.organizationId
  );
  const [filterOption, setFilterOption] = useState(queryParams.filter);
  const [userReportedAsFilter, setUserReportedAsFilterOption] = useState(
    queryParams.userMarkedAsSpam
  );
  const [campaignThreatId, setCampaignThreatId] = useState(
    queryParams.campaignThreatId
  );

  const isSmallLaptop = useMediaQuery('(max-width: 992px)');

  return (
    <>
      <ThreatFeedSunsetModal />
      <Row>
        <Col xs={12}>
          <Paper zDepth={1}>
            <Toolbar style={styles.toolbar}>
              <ToolbarGroup firstChild>
                <SearchField
                  containerStyles={styles.toolbarSearchField}
                  hintText={<FormattedMessage {...Intl.searchFieldHint} />}
                  value={searchText}
                  initialValue={queryParams.searchText}
                  onChange={(e, newValue) => {
                    setSearchText(newValue);
                    syncQueryParams({
                      searchText: newValue.length ? newValue : undefined,
                    });
                  }}
                  onFocus={() => {
                    analytics.track(
                      EClientEvent.RATE_THREAT_INDEX_VIEW_SEARCH_FOCUSED
                    );
                  }}
                />
                <OnlySuperAdmin>
                  <OrganizationSelector
                    onChange={newValue => {
                      syncQueryParams({
                        organizationId: newValue || undefined,
                      });
                      setOrganizationIdFilter(newValue);
                      analytics.track(
                        EClientEvent.RATE_THREAT_INDEX_VIEW_FILTER_SELECTED,
                        { filterType: 'organization_filter' }
                      );
                    }}
                    value={
                      organizationIdFilter || queryParams.organizationId || null
                    }
                    includeAllOption
                  />
                </OnlySuperAdmin>
                <UserReportedAsFilterDropdown
                  onChange={(e, newValue) => {
                    setUserReportedAsFilterOption(newValue);
                    syncQueryParams({
                      userReportedAsFilter: newValue || undefined,
                    });
                    analytics.track(
                      EClientEvent.RATE_THREAT_INDEX_VIEW_FILTER_SELECTED,
                      { filterType: 'user_reported_as_filter' }
                    );
                  }}
                  value={
                    userReportedAsFilter || queryParams.userMarkedAsSpam || null
                  }
                  includeAllOption
                />
                <ThreatFilterOptionIconMenu
                  value={filterOption || queryParams.filter}
                  onChange={(e, newValue) => {
                    setCampaignThreatId(undefined);
                    setFilterOption(newValue);
                    syncQueryParams({
                      filter: newValue,
                      campaignThreatId: undefined,
                    });
                    analytics.track(
                      EClientEvent.RATE_THREAT_INDEX_VIEW_FILTER_SELECTED,
                      { filterType: 'threat_severity_filter' }
                    );
                  }}
                  campaignFilterSet={campaignThreatId}
                  defaultValue={EThreatSeverityGroup.ALL}
                  containerStyle={styles.toolbarFilter}
                />
              </ToolbarGroup>
              <OnlySuperAdmin>
                <ToolbarGroup>
                  <QuickRating containerStyle={styles.toolbarQuickRating} />
                </ToolbarGroup>
              </OnlySuperAdmin>
            </Toolbar>
          </Paper>
        </Col>
        <Col sm={0} lg={3}>
          <WorkQueue
            onLoad
            selectedItemId={match.params.threatId}
            containerStyles={styles.workQueueListContainer}
            listStyles={styles.workQueueList(isSmallLaptop)}
            searchFilter={{
              searchText,
              filterOption,
              userReportedAsFilter,
              campaignThreatId,
              organizationIdFilter,
            }}
            setCampaignThreatId={threatId => {
              setCampaignThreatId(threatId);
              syncQueryParams({
                campaignThreatId: threatId,
                filter: undefined,
              });
              analytics.track(
                EClientEvent.RATE_THREAT_INDEX_VIEW_FILTER_SELECTED,
                { filterType: 'campaign_threat_id_filter' }
              );
            }}
          />
        </Col>
        <Col sm={12} lg={9}>
          <div style={styles.childContainer}>
            {params.threatId && (
              <RateThreatContainerView threatId={params.threatId} />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

RateThreatIndexView.propTypes = PROP_TYPES;

export default compose(
  withRouter,
  injectStyles(Styles),
  injectAnalytics
)(RateThreatIndexView);
