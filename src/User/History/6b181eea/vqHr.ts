import { expect } from 'chai';
import sinon from 'sinon';

import { ACL } from '@server/domains/lib/auth/roles';
import { testACL } from '@server/domains/lib/testShared';
import {
  createStubGetConfig,
  createStubGetGlobal,
  createStubHandlerCtx,
} from '@server/domains/lib/testUtil';

import getSignedUrl from '../getSignedUrl';
import { IGetSignedUrlPayload } from '../lib/getSignedUrl.models';
import { ESignedUrlAction } from '../lib/models';

import { createMockCloudStorage } from './lib';

describe('integration.googleCloudStorage.getSignedUrl', () => {
  testACL(getSignedUrl, [
    ACL.Roles.SUPER_ADMIN,
    ACL.Roles.TASK_RUNNER,
    ACL.Roles.ADMIN,
    ACL.Roles.SOC_OPERATOR,
    ACL.Roles.USER,
  ]);

  const setup = async (overrides: {
    payload: IGetSignedUrlPayload;
    keyFilename?: string;
  }) => {
    const gcStorage = createMockCloudStorage([
      {
        resourceUrl: overrides.payload.resourceUrl,
      },
    ]);
    const stubGetGlobal = { gcStorage: gcStorage.client };
    const gcStorageSpy = sinon.spy(stubGetGlobal, 'gcStorage');

    const ctx = createStubHandlerCtx({
      getGlobal: createStubGetGlobal(stubGetGlobal),
      getConfig: createStubGetConfig({
        googleStorageConfig: {
          con: 'fig',
        },
        workloadIdentityWorkaroundGoogleApplicationCredentials:
          overrides.keyFilename || null,
      }),
    });

    return {
      ctx,
      gcStorage,
      gcStorageSpy,
    };
  };

  it('should return signed url for resource', async () => {
    const payload: IGetSignedUrlPayload = {
      resourceUrl: 'gs://bucket/filePath',
      options: {
        expires: new Date(),
        action: ESignedUrlAction.WRITE,
      },
    };

    const { ctx } = await setup({ payload });

    const result = await getSignedUrl.handler(ctx, payload);

    expect(result.signedUrl).eql(`signed:${payload.resourceUrl}`);
  });
  it('should forward options to file signing', async () => {
    const payload: IGetSignedUrlPayload = {
      resourceUrl: 'gs://bucket/filePath',
      options: {
        expires: new Date(),
        action: ESignedUrlAction.WRITE,
      },
    };

    const { ctx, gcStorage } = await setup({ payload });

    await getSignedUrl.handler(ctx, payload);

    expect(gcStorage.files[0].getSignedUrl.firstCall.args).eql([
      payload.options,
    ]);
  });
  it('should set default CNAME if bucketName ends in hoxhunt.com', async () => {
    const payload: IGetSignedUrlPayload = {
      resourceUrl: 'gs://storage.hoxhunt.com/asd/nlaa.html',
      options: {
        expires: new Date(),
        action: ESignedUrlAction.WRITE,
      },
    };

    const { ctx, gcStorage } = await setup({ payload });

    await getSignedUrl.handler(ctx, payload);

    expect(gcStorage.files[0].getSignedUrl.firstCall.args).eql([
      {
        ...payload.options,
        cname: 'https://storage.hoxhunt.com',
      },
    ]);
  });
  it('should call gcStorage with default config if none other provided', async () => {
    const payload: IGetSignedUrlPayload = {
      resourceUrl: 'gs://bucket/filePath',
      options: {
        expires: new Date(),
        action: ESignedUrlAction.WRITE,
      },
    };

    const { ctx, gcStorageSpy } = await setup({
      payload,
    });
    await getSignedUrl.handler(ctx, payload);
    expect(gcStorageSpy.firstCall.args).eql([{ con: 'fig' }]);
  });
  it('should call gcStorage with workaround config if provided otherwise with default', async () => {
    const payload: IGetSignedUrlPayload = {
      resourceUrl: 'gs://bucket/filePath',
      options: {
        expires: new Date(),
        action: ESignedUrlAction.WRITE,
      },
    };

    const keyFilename = 'path/to/something_totally_different.json';
    const { ctx, gcStorageSpy } = await setup({
      payload,
      keyFilename,
    });
    await getSignedUrl.handler(ctx, payload);
    expect(gcStorageSpy.firstCall.args).eql([{ keyFilename: keyFilename }]);
  });
});
