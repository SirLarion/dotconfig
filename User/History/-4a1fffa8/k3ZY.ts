import React from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { config } from '../../utils/config';
import { GetCloudinaryUploadParamsDocument as GET_UPLOAD_PARAMS } from './__generated__/GetCloudinaryUploadParams.generated';

/**
 * https://cloudinary.com/documentation/upload_widget_reference#widget_parameters
 */
export type TCloudinaryUploadOptions = {
  uploadPreset: string;
  showPoweredBy?: boolean;
  allowedFormats?: string[];
  maxFileSize?: number;
  maxImageWidth?: number;
  maxImageHeight?: number;
  sources?: Readonly<Array<'local' | 'url' | 'camera' | 'image_search'>>;
  defaultSource?: string;
  multiple?: boolean;
  maxFiles?: number;
  cropping?: boolean;
  showSkipCropButton?: boolean;
  croppingAspectRatio?: number;
  croppingCoordinatesMode?: 'custom' | 'face';
  publicId?: string;
  folder?: string;
  tags?: string[];
  resourceType?: 'auto' | 'raw' | 'image';
  theme?: string;
};

/* eslint-disable @typescript-eslint/naming-convention */
type TUploadDataRaw = {
  asset_id: string;
  batchId: string;
  bytes: number;
  created_at: string;
  etag: string;
  format: string;
  height: number;
  id: string;
  original_filename: string;
  overwritten: true;
  path: string;
  placeholder: false;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  thumbnail_url: string;
  type: string;
  url: string;
  version: number;
  version_id: string;
};
/* eslint-enable @typescript-eslint/naming-convention */

export type TUploadData = Omit<
  TUploadDataRaw,
  | 'asset_id'
  | 'created_at'
  | 'original_filename'
  | 'public_id'
  | 'resource_type'
  | 'secure_url'
  | 'thumbnail_url'
  | 'version_id'
> & {
  assetId: TUploadDataRaw['asset_id'];
  createdAt: TUploadDataRaw['created_at'];
  originalFilename: TUploadDataRaw['original_filename'];
  publicId: TUploadDataRaw['public_id'];
  resourceType: TUploadDataRaw['resource_type'];
  secureUrl: TUploadDataRaw['secure_url'];
  thumbnailUrl: TUploadDataRaw['thumbnail_url'];
  versionId: TUploadDataRaw['version_id'];
};

/**
 * Only success event supported ATM. See full reference:
 * https://cloudinary.com/documentation/upload_widget_reference#events
 */
type TEventInfo = {
  success: TUploadDataRaw;
};

type TWidgetEvent<TEvent extends string> = {
  event: TEvent;
  info: TEvent extends keyof TEventInfo ? TEventInfo[TEvent] : unknown;
};

type TResult =
  | TWidgetEvent<'abort'>
  | TWidgetEvent<'batch-cancelled'>
  | TWidgetEvent<'close'>
  | TWidgetEvent<'display-changed'>
  | TWidgetEvent<'publicid'>
  | TWidgetEvent<'queues-end'>
  | TWidgetEvent<'queues-start'>
  | TWidgetEvent<'retry'>
  | TWidgetEvent<'show-completed'>
  | TWidgetEvent<'source-changed'>
  | TWidgetEvent<'success'>
  | TWidgetEvent<'tags'>
  | TWidgetEvent<'upload-added'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCloudinary = () => (window as any).cloudinary;

const handleSuccessResult = ({
  asset_id: assetId,
  created_at: createdAt,
  original_filename: originalFilename,
  public_id: publicId,
  resource_type: resourceType,
  secure_url: secureUrl,
  thumbnail_url: thumbnailUrl,
  version_id: versionId,
  ...rest
}: TUploadDataRaw): TUploadData => ({
  assetId,
  createdAt,
  originalFilename,
  publicId,
  resourceType,
  secureUrl,
  thumbnailUrl,
  versionId,
  ...rest,
});

export const useUploadWidget = () => {
  const client = useApolloClient();

  const signUpload = React.useCallback(
    (cb, params) => {
      client
        .query<{ signedCloudinaryUploadParams: string }>({
          query: GET_UPLOAD_PARAMS,
          variables: { params },
        })
        .then(result => cb(result.data.signedCloudinaryUploadParams))
        .catch(error => cb(error));
    },
    [client]
  );

  const mapToCloudinaryOptions = React.useCallback(
    (options: TCloudinaryUploadOptions) => {
      const {
        allowedFormats: clientAllowedFormats,
        publicId,
        ...rest
      } = options;

      const {
        cloudinaryBasename,
        cloudinaryApiKey: apiKey,
        cloudinaryCloudName: cloudName,
      } = config;

      return {
        publicId: `${publicId}-${cloudinaryBasename}`,
        clientAllowedFormats,
        uploadSignature: signUpload,
        apiKey,
        cloudName,
        ...rest,
      };
    },
    [signUpload]
  );

  const open = React.useCallback(
    (options: TCloudinaryUploadOptions) =>
      new Promise((resolve, reject) => {
        const widget = getCloudinary().openUploadWidget(
          mapToCloudinaryOptions(options),
          (error: Error, result: TResult) => {
            if (error) {
              reject(error);
              return;
            }
            if (result.event === 'success') {
              resolve(handleSuccessResult(result.info));
              widget.close();
            }
          }
        );
        widget.open();
      }),
    [mapToCloudinaryOptions]
  );

  return {
    open,
  };
};
