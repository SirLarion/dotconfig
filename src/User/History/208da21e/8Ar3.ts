import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import crypto, { Hash } from 'crypto';
import * as R from 'ramda';
import sinon from 'sinon';

import {
  IGetSignedUrlPayload,
  TGetSignedUrlContext,
} from '@server/domains/integration/googleCloudStorage/lib/getSignedUrl.models';
import {
  TUploadContext,
  TUploadPayload,
} from '@server/domains/integration/googleCloudStorage/lib/upload.models';
import { ADMIN, SUPER_ADMIN, USER } from '@server/domains/lib/auth/roles';
import {
  insertMockOrganization,
  withOrganizationOverrides,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  insertMockUser,
  withCombinedRolesAndOrgId,
  withDefaultProfile,
} from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withAppConfig,
  withHandlerTree,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import createUserListCSVFile, {
  EXPORT_DENIED_ERROR,
  NO_USERS_ERROR,
} from '../createUserListCSVFile';
import {
  CSV_FILENAME_PREFIX,
  GCS_CSV_FOLDER,
} from '../lib/createUserListCSVFile.lib';
import { TSelectedUserDataId } from '../lib/createUserListCSVFile.models';

chai.use(chaiAsPromised);

const MOCK_BUCKET_NAME = 'testi-aempaeri';
const MOCK_ORG_ID = 'MegaCorp_Industries_Incorporated_Co';
const MOCK_HASH_VALUE = 'h45h';
const MOCK_EXPECTED_RESOURCE_URL = `gs://${MOCK_BUCKET_NAME}/${MOCK_ORG_ID}/${GCS_CSV_FOLDER}/${CSV_FILENAME_PREFIX}${MOCK_HASH_VALUE}.csv`;

const testColumns: TSelectedUserDataId[] = [
  'firstName',
  'lastName',
  'emailAddress',
  'successRate',
];

const setup = async () => {
  const org = await insertMockOrganization(
    withOrganizationOverrides({ _id: MOCK_ORG_ID })
  );
  const user = await insertMockUser(
    withCombinedRolesAndOrgId([ADMIN], org._id),
    withDefaultProfile({ firstName: 'Admindude' })
  );
  const defaultPayload = {
    selectedColumns: testColumns,
    organizationId: org._id,
    searchParams: {
      params: {
        selector: { organizationId: org._id },
      },
      searchString: '',
    },
  };

  const stubUpload = sinon
    .stub()
    .callsFake(
      (ctx: TUploadContext, { bucketName, remoteFilePath }: TUploadPayload) =>
        `gs://${bucketName}/${remoteFilePath}`
    );

  const ctx = await R.pipe(
    withAppConfig({
      googleCloudStorageBucket: MOCK_BUCKET_NAME,
      googleStorageConfig: {
        projectId: 'bingbong',
      },
      workloadIdentityWorkaroundGoogleApplicationCredentials: 'dingdong',
    }),
    withHandlerTree({
      integration: {
        googleCloudStorage: {
          upload: stubUpload,
          getSignedUrl: sinon
            .stub()
            .callsFake(
              (
                ctx: TGetSignedUrlContext,
                { resourceUrl }: IGetSignedUrlPayload
              ) => `signed:${resourceUrl}`
            ),
        },
      },
    }),
    withUserIdentity(user),
    createIntegrationCtx
  )(null);

  return { ctx, org, stubUpload, defaultPayload };
};

const createNUsers = async (N: number, orgId: string) => {
  return await Promise.all(
    R.times(
      async () =>
        await insertMockUser(withCombinedRolesAndOrgId([USER], orgId)),
      N
    )
  );
};

describe('admin.userManagement.createUserListCSVFile', () => {
  testACL(createUserListCSVFile, [ADMIN, SUPER_ADMIN]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  sinon.stub(Hash.prototype, 'digest').returns(MOCK_HASH_VALUE);

  it('should create a CSV file and upload to GCS', async () => {
    const { ctx, org, stubUpload, defaultPayload } = await setup();

    await insertMockUser(
      withCombinedRolesAndOrgId([USER], org._id),
      withDefaultProfile({ firstName: 'Alice' })
    );
    await insertMockUser(
      withCombinedRolesAndOrgId([USER], org._id),
      withDefaultProfile({ firstName: 'Bob' })
    );

    const expectedUploadArgs = {
      bucketName: MOCK_BUCKET_NAME,
      fileContents: 'firstName\nAdmindude\nAlice\nBob',
      uploadType: 'content',
      remoteFilePath: `${MOCK_ORG_ID}/${GCS_CSV_FOLDER}/${CSV_FILENAME_PREFIX}${MOCK_HASH_VALUE}.csv`,
    };

    await ctx.handlers.admin.userManagement.createUserListCsvFile(ctx, {
      ...defaultPayload,
      selectedColumns: ['firstName'],
    });

    expect(stubUpload.calledWith(expectedUploadArgs)).eql(true);
  });

  it('should upload a CSV file to GCS', async () => {
    const { ctx, org, stubUpload, defaultPayload } = await setup();
    await createNUsers(10, org._id);

    await ctx.handlers.admin.userManagement.createUserListCsvFile(
      ctx,
      defaultPayload
    );

    expect(stubUpload.firstCall.returnValue).eql(MOCK_EXPECTED_RESOURCE_URL);
  });

  it('should output a signed URL for accessing an uploaded CSV', async () => {
    const { ctx, org, defaultPayload } = await setup();
    await createNUsers(10, org._id);

    try {
      const { signedUrl } =
        await ctx.handlers.admin.userManagement.createUserListCsvFile(
          ctx,
          defaultPayload
        );
      expect(signedUrl).eql(`signed:${MOCK_EXPECTED_RESOURCE_URL}`);
    } catch {
      expect.fail();
    }
  });
});
