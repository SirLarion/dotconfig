import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { testACL } from '@server/domains/lib/testShared';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { createStubHandlerCtx } from '@server/domains/lib/testUtil';

import add from '../add';
import { IAddPayload as TPayload } from '../lib/add.models';

chai.use(chaiAsPromised);

describe('organization.domain.add', () => {
  testACL(add, [ADMIN, SUPER_ADMIN]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  const happyCaseTests: Array<{
    description: string;
    payload: TPayload;
  }> = [
    {
      description: `Happy cases should be tested`,
      payload: {},
    },
  ];

  for (const test of happyCaseTests) {
    it(test.description, async () => {
      const ctx = createStubHandlerCtx({
        http: sinon.stub().rejects('no.'),
      });

      const result = await add.handler(ctx, test.payload);

      expect(result).eql(false);
    });
  }

  const sadCaseTests: Array<{
    description: string;
    payload: TPayload;
    throws: string | RegExp | Error;
  }> = [
    {
      description: `Sad error cases should be tested`,
      payload: {},
      throws: 'Error in reasoning',
    },
  ];

  for (const test of sadCaseTests) {
    it(test.description, async () => {
      const ctx = createStubHandlerCtx({
        http: sinon.stub().rejects('no.'),
      });

      await expect(add.handler(ctx, test.payload)).to.be.rejectedWith(
        () => test.throws
      );
    });
  }
});
