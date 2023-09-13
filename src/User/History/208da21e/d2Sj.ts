import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as R from 'ramda';
import sinon from 'sinon';

import {
  IGetSignedUrlPayload,
  TGetSignedUrlContext,
} from '@server/domains/integration/googleCloudStorage/lib/getSignedUrl.models';
import { EUploadContentDisposition } from '@server/domains/integration/googleCloudStorage/lib/models';
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
  withUserOverrides,
} from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withAppConfig,
  withGlobals,
  withHandlerTree,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import createUserListCSVFile, { CSV_FILENAME } from '../createUserListCSVFile';
import { GCS_CSV_FOLDER } from '../lib/createUserListCSVFile.lib';
import { TSelectedUserDataId } from '../lib/createUserListCSVFile.models';

chai.use(chaiAsPromised);

const MOCK_BUCKET_NAME = 'testi-aempaeri';
const MOCK_USER_ID = '123_testing';
const MOCK_ORG_ID = 'MegaCorp_Industries_Incorporated_Co';
const FROZEN_DATE = new Date(2022, 2, 20);
const FROZEN_ISO = FROZEN_DATE.toISOString();
const MOCK_EXPECTED_RESOURCE_URL = `gs://${MOCK_BUCKET_NAME}/${MOCK_ORG_ID}/${GCS_CSV_FOLDER}/${MOCK_USER_ID}_${FROZEN_ISO}.csv`;

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
    withUserOverrides({ _id: MOCK_USER_ID }),
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
      (
        ctx: TUploadContext,
        { bucketName, remoteFilePath }: TUploadPayload
      ) => ({ resourceUrl: `gs://${bucketName}/${remoteFilePath}` })
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
              ) => ({ signedUrl: `signed:${resourceUrl}` })
            ),
        },
      },
    }),
    withGlobals({ newDate: () => FROZEN_DATE }),
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
      remoteFilePath: `${MOCK_ORG_ID}/${GCS_CSV_FOLDER}/${MOCK_USER_ID}${FROZEN_DATE}.csv`,
      fileName: CSV_FILENAME,
      uploadType: 'content',
      contentDisposition: EUploadContentDisposition.ATTACHMENT,
    };

    await ctx.handlers.admin.userManagement.createUserListCsvFile(ctx, {
      ...defaultPayload,
      selectedColumns: ['firstName'],
    });

    expect(stubUpload.firstCall.lastArg).eql(expectedUploadArgs);
  });

  it('should get the correct resource url from GCS', async () => {
    const { ctx, org, stubUpload, defaultPayload } = await setup();
    await createNUsers(10, org._id);

    await ctx.handlers.admin.userManagement.createUserListCsvFile(
      ctx,
      defaultPayload
    );

    expect(stubUpload.firstCall.returnValue).eql({
      resourceUrl: MOCK_EXPECTED_RESOURCE_URL,
    });
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

  it('should throw an error if a user tries to export data from another org without super admin rights', async () => {
    const { ctx, defaultPayload } = await setup();
    await createNUsers(10, 'innocent_other_org');

    try {
      await ctx.handlers.admin.userManagement.createUserListCsvFile(ctx, {
        ...defaultPayload,
        organizationId: 'innocent_other_org',
      });
      expect.fail();
    } catch (err) {
      expect(err.message).eql('Unauthorized input');
    }
  });
});
