import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import { EUserRole, TASK_RUNNER } from '@server/domains/lib/auth/roles';
import {
  insertMockUser,
  withOrgRoles,
} from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import { createStubHandlerCtx } from '@server/domains/lib/testUtil';
import {
  createIntegrationCtx,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import findTestTemplates from '../findTestTemplates';
import { IFindTestTemplatesPayload } from '../lib/findTestTemplates.models';

chai.use(chaiAsPromised);

describe('admin.technicalTesting.findTestTemplates', () => {
  testACL(findTestTemplates, [TASK_RUNNER]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  const setup = async () => {
    const user = await insertMockUser(withOrgRoles([EUserRole.ADMIN]));

    const ctx = await R.pipe(
      withUserIdentity(user),
      createIntegrationCtx
    )(null);

    return {
      ctx,
      user,
    };
  };

  it('should return all technical test templates', async () => {
    const { ctx, user } = await setup();
  });

  const happyCaseTests: Array<{
    description: string;
    payload: IFindTestTemplatesPayload;
  }> = [
    {
      description: `should return all quest templates with technical test tag`,
      payload: {},
    },
  ];

  for (const test of happyCaseTests) {
    it(test.description, async () => {
      const ctx = createStubHandlerCtx({
        http: sinon.stub().rejects('no.'),
      });

      const result = await findTestTemplates.handler(ctx, test.payload);

      expect(result).eql(false);
    });
  }

  const sadCaseTests: Array<{
    description: string;
    payload: IFindTestTemplatesPayload;
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

      await expect(
        findTestTemplates.handler(ctx, test.payload)
      ).to.be.rejectedWith(() => test.throws);
    });
  }
});
