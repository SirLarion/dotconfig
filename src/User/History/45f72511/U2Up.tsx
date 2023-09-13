import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { Enzyme } from '../../../npm/Enzyme';
import {
  getContext,
  getThemeContextDef,
  mountWithIntl,
  matchTestId,
  timeout,
} from '../../../utils/testUtils';

import { SendQuestToCurrentUserContainer } from '../SendQuestToCurrentUserContainer';
import { GetCurrentUserEmailDocument } from '../graphql/__generated__/GetCurrentUserEmail.generated';
import { SendQuestsToEmailsDocument } from '../graphql/__generated__/SendQuestsToEmails.generated';
import sinon from 'sinon';
import { EQuestOrigin } from '../../../models/quest';

const setup = async (additionalMocks: any = []) => {
  const questTag = 'foo.tag.foo';
  const email = 'foo.bar@foo.com';
  const mocks = [
    {
      request: {
        query: GetCurrentUserEmailDocument,
      },
      result: sinon.stub().returns({
        data: {
          currentUser: {
            _id: 'habla',
            emails: [
              {
                address: email,
                verified: true,
                __typename: 'EmailAddress',
              },
            ],
            __typename: 'User',
          },
        },
      }),
    },
    {
      request: {
        query: SendQuestsToEmailsDocument,
        variables: {
          emails: [email],
          questTags: [questTag],
          origin: EQuestOrigin.EDITOR,
        },
      },
      result: sinon.stub().returns({
        data: [{ _id: 'foofof', __typename: 'foo' }],
      }),
    },
  ];

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename>
      <SendQuestToCurrentUserContainer>
        {sendQuest => {
          return (
            <button data-test-id="mutate" onClick={() => sendQuest(questTag)} />
          );
        }}
      </SendQuestToCurrentUserContainer>
    </MockedProvider>,
    getContext(getThemeContextDef())
  );

  const getButton = () => wrapper.findWhere(matchTestId('mutate')).first();

  await timeout(0);

  return {
    wrapper,
    mocks,
    getButton,
  };
};

describe('SendQuestToCurrentUser', () => {
  afterEach(() => Enzyme.unmountAll());
  it('should call sendQuestsToUsers mutation with proper values', async () => {
    const { mocks, getButton } = await setup();

    expect(mocks[1].result.callCount).toEqual(0);
    expect(
      mocks[0].result.firstCall.returnValue.data.currentUser.emails[0].address
    ).toEqual('foo.bar@foo.com');

    getButton().simulate('click');
    await timeout(0);

    expect(mocks[1].result.callCount).toEqual(1);

    expect(mocks[1].result.firstCall.returnValue.data[0]._id).toEqual('foofof');
    expect(mocks[1].result.firstCall.returnValue.data[0].__typename).toEqual(
      'foo'
    );
  });
});
