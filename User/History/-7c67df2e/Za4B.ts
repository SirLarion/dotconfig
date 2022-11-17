import R from 'ramda';

import { withAnalyticsEvent, withUserId } from '@hox/telemetry-shared/context';

import { ACL } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import {
  EEvent,
  userPersistedEvents as userPersistedAnalyticsEvents,
} from '@server/lib/analyticEvents';

import {
  PAYLOAD_INVALIDATOR_KEY,
  PAYLOAD_INVALIDATOR_VALUE,
  TEventPayload,
  TTrackContext,
  TTrackHandlerConfig,
  TTrackPayload,
} from './lib/track.models';
import {
  PAYLOAD_INVALIDATOR_KEY as DETACHED_PAYLOAD_INVALIDATOR_KEY,
  PAYLOAD_INVALIDATOR_VALUE as DETACHED_PAYLOAD_INVALIDATOR_VALUE,
  TTrackDetachedPayload,
} from './lib/trackDetached.models';

/**
 * Validates that the payload was created using a proper factory function.
 *
 * See {@link TTrackPayload} for more details about the reasoning.
 */
const parsePayload = (
  ctx: TTrackContext,
  payload: TTrackPayload
): TEventPayload => {
  if (payload[PAYLOAD_INVALIDATOR_KEY] !== PAYLOAD_INVALIDATOR_VALUE) {
    throw new Error('Got invalid event payload');
  }

  return R.mergeRight(
    { timestamp: ctx.getGlobal('newDate')() },
    R.omit([PAYLOAD_INVALIDATOR_KEY], payload)
  );
};

// Not exported to avoid usage from outside of this handler. Events MUST always
// be submitted through track and never directly to trackDetached to avoid breaking
// game assumptions via racy detached code.
const buildDetachedEvent = (payload: TEventPayload): TTrackDetachedPayload => ({
  ...payload,
  [DETACHED_PAYLOAD_INVALIDATOR_KEY]: DETACHED_PAYLOAD_INVALIDATOR_VALUE,
});

type TUserPersistedAnalyticsEvent = typeof userPersistedAnalyticsEvents[number];

const isUserPersistedAnalyticsEvent = (
  event: EEvent
): event is TUserPersistedAnalyticsEvent =>
  userPersistedAnalyticsEvents.includes(event as TUserPersistedAnalyticsEvent);

const track: TTrackHandlerConfig = {
  roles: [
    ACL.Roles.SUPER_ADMIN,
    ACL.Roles.TASK_RUNNER,
    ACL.Roles.ADMIN,
    ACL.Roles.USER,
  ],
  telemetry: {
    inputToLogMessageAttributes: payload => [
      withUserId(String(payload.userId)),
      withAnalyticsEvent(String(payload.event)),
    ],
  },
  async handler(ctx, payload) {
    // Run all subsequent calls in elevated ctx to ensure authorization
    const elevatedCtx = withTaskRunnerRole(ctx);
    const eventPayload = parsePayload(elevatedCtx, payload);

    const persistsPromises: Array<Promise<unknown>> = [
      ctx.handlers.analytics.sink.trackDetached(
        ctx,
        buildDetachedEvent(eventPayload)
      ),
    ];

    // Should we have a seperate array for events which need reward recalculation? This is redundant for most events
    if (isUserPersistedAnalyticsEvent(eventPayload.event)) {
      persistsPromises.push(
        elevatedCtx.handlers.user.enrichment.persistEventsAndRecalculateRewards(
          elevatedCtx,
          {
            events: [eventPayload.event],
            userId: `${eventPayload.userId}`,
          }
        )
      );
    }

    await Promise.all(persistsPromises);

    return {};
  },
};

export default track;
