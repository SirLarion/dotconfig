import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { pipe } from 'ramda';

import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import {
  insertMockOrganization,
  withDomains,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import { createMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { ESupportedLocales } from '@server/lib/i18n';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import update from '../update';

chai.use(chaiAsPromised);

const DOMAIN_CONTEXT_INPUT = {
  name: 'second.com',
  defaultUiLanguage: ESupportedLocales.EN,
  defaultSimulationLanguages: [ESupportedLocales.FI],
  allowedSimulationLanguages: [ESupportedLocales.EN, ESupportedLocales.FI],
  context: {
    webmail: {
      name: 'Webmail',
      fakeUrl: 'https://www.fake.com',
      url: 'https://www.legit.com',
    },
    telecomOperator: {},
    persons: {
      ceo: {
        name: 'CEO Business man',
        email: 'ceo@ceo.com',
      },
      hr: {
        name: 'HR Person',
        email: 'hr@hr.com',
      },
    },
    organization: {
      name: 'Denger & Schams',
      postAddress: {
        street: 'Yeetstreet 42',
        city: 'SkeetCity',
        postCode: '886644',
      },
      theme: {
        mainColor: '#ffffff',
      },
    },
  },
};

const setup = async () => {
  const org = await insertMockOrganization(
    withDomains([
      { name: 'first.com', defaultUiLanguage: ESupportedLocales.EN },
      { name: 'second.com', defaultUiLanguage: ESupportedLocales.EN },
      { name: 'third.com', defaultUiLanguage: ESupportedLocales.EN },
    ])
  );

  const user = await createMockUser(
    {
      organizationId: org._id,
      roles: {
        [org._id]: [ADMIN],
      },
    },
    { persist: true }
  );

  const ctx = await pipe(
    withUserIdentity(user, [ADMIN]),
    createIntegrationCtx
  )(null);

  return { org, ctx, user };
};

describe('organization.domain.update', () => {
  testACL(update, [ADMIN, SUPER_ADMIN]);

  beforeEach(() => resetDatabase());

  it('should update single domain and keep the array order', async () => {
    const { ctx, org, user } = await setup();

    const domainsBeforeUpdate = org.domains;

    await ctx.handlers.organization.domain.update(ctx, {
      organizationId: user.organizationId,
      domainInput: DOMAIN_CONTEXT_INPUT,
    });

    const domainsAfterUpdate = await (
      await ctx.handlers.collection.organization.get(ctx, { id: org._id })
    ).domains;

    const domainOrderBeforeUpdate = domainsBeforeUpdate.map(
      domain => domain.name
    );
    const domainOrderAfterUpdate = domainsAfterUpdate.map(
      domain => domain.name
    );

    expect(domainsBeforeUpdate[0]).to.deep.equal(domainsAfterUpdate[0]);
    expect(domainsBeforeUpdate[1]).not.to.deep.equal(domainsAfterUpdate[1]);
    expect(domainsBeforeUpdate[2]).to.deep.equal(domainsAfterUpdate[2]);
    expect(domainOrderBeforeUpdate).to.deep.equal(domainOrderAfterUpdate);
  });

  it('should not be able to edit domains in other orgs', async () => {
    const { ctx } = await setup();

    await expect(
      ctx.handlers.organization.domain.update(ctx, {
        organizationId: 'lolnope',
        domainInput: DOMAIN_CONTEXT_INPUT,
      })
    ).to.rejectedWith('Unauthorized input');
  });
});
