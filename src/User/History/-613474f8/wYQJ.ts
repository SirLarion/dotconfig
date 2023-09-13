import sinon from 'sinon';
import { Readable } from 'stream';

import { TGoogleStorageFile } from '../lib/models';

type TMockStorageFile = {
  resourceUrl?: string;
  name?: string;
  metadata?: TGoogleStorageFile['metadata'];
  content?: string;
};

const createMockStorageFile = (file: TMockStorageFile) => ({
  ...file,
  save: sinon.stub().returns({ resourceUrl: file.resourceUrl }),
  delete: sinon.stub(),
  getSignedUrl: sinon.stub().returns([`signed:${file.resourceUrl}`]),
  createReadStream: () => Readable.from(file.content),
});

const createMockStorageBucket = (files: unknown[]) => ({
  file: sinon.stub().returns(files[0]),
  getFiles: sinon.stub().resolves([files]),
  upload: sinon.stub().returns(Promise.resolve([files[0]])),
});

const createMockStorage = (bucket: unknown) => ({
  bucket: sinon.stub().returns(bucket),
});

export const createMockCloudStorage = (fileMocks: TMockStorageFile[]) => {
  const files = fileMocks.map(createMockStorageFile);
  const bucket = createMockStorageBucket(files);
  const storage = createMockStorage(bucket);
  const client = () => storage;

  return { client, bucket, storage, files, file: files[0] };
};
