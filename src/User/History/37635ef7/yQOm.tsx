import React, { ReactNode, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { useToast } from '@hox/ui/ToastHub';

export const SETTINGS_TOASTS_INTL = {
  success: (
    <FormattedMessage
      id="app.admin.settingSaved.message.success"
      defaultMessage="Saved!"
      description="Message to show after a setting has been successfully changed"
    />
  ),
  error: (
    <FormattedMessage
      id="app.admin.settingChanged.error.title"
      defaultMessage="Failed to change setting"
      description="Message to show if updating a setting goes wrong"
    />
  ),
  errorDescription: (
    <FormattedMessage
      id="app.admin.settingChanged.error.description"
      defaultMessage="Please try again. If the error persists, contact support"
      description="Description for error which shows if updating a setting goes wrong"
    />
  ),
};

const TOAST_SUCCESS_TIMEOUT_MS = 3000;
const TOAST_ERROR_TIMEOUT_MS = 6000;

export const useSettingsToasts = () => {
  const { createToast } = useToast();

  const showSuccessToast = useCallback(
    (message?: ReactNode) => {
      createToast({
        title: message || SETTINGS_TOASTS_INTL.success,
        type: 'positive',
        timeout: TOAST_SUCCESS_TIMEOUT_MS,
      });
    },
    [createToast]
  );

  const showErrorToast = useCallback(
    (message?: ReactNode) => {
      createToast({
        title: message || SETTINGS_TOASTS_INTL.error,
        message: SETTINGS_TOASTS_INTL.errorDescription,
        type: 'error',
        timeout: TOAST_ERROR_TIMEOUT_MS,
      });
    },
    [createToast]
  );

  return { showSuccessToast, showErrorToast };
};

export const useWithSettingsToasts = () => {
  const { showSuccessToast, showErrorToast } = useSettingsToasts();

  return <T,>(promise: Promise<T>) => {
    return promise.then(showSuccessToast).catch(showErrorToast);
  };
};
