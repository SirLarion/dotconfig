import { shouldPolyfill as shouldPolyfillDatetimeformat } from '@formatjs/intl-datetimeformat/should-polyfill';
import { shouldPolyfill as shouldPolyfillGetcanonicallocales } from '@formatjs/intl-getcanonicallocales/should-polyfill';
import { shouldPolyfill as shouldPolyfillLocale } from '@formatjs/intl-locale/should-polyfill';
// import { shouldPolyfill as shouldPolyfillNumberformat } from '@formatjs/intl-numberformat/should-polyfill';
import { shouldPolyfill as shouldPolyfillPluralrules } from '@formatjs/intl-pluralrules/should-polyfill';
// import { shouldPolyfill as shouldPolyfillRelativetimeformat } from '@formatjs/intl-relativetimeformat/should-polyfill';
import * as dateFnsLocales from 'date-fns/locale';
import { registerLocale, setDefaultLocale } from 'react-datepicker';

/**
 * NOTICE! When adding a locale, also add the required locale file to ./polyfills/locales
 */
export enum ELocale {
  EN = 'en',
}

const dateFnsLocaleKeys: { [key in ELocale]: keyof typeof dateFnsLocales } = {
  [ELocale.EN]: 'enUS',
};

const createDoPolyfillsForLocale = (locale: ELocale) => async () => {
  if (
    shouldPolyfillGetcanonicallocales() ||
    shouldPolyfillLocale() ||
    shouldPolyfillPluralrules() ||
    // shouldPolyfillNumberformat() ||
    // shouldPolyfillRelativetimeformat() ||
    shouldPolyfillDatetimeformat()
  ) {
    // NOTE: had to use extension .js because of Vite limitations on dynamic imports
    // ref: https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    // @ts-ignore
    import('./polyfills/polyfills.js').then(() => {
      import(`./polyfills/locales/${locale}.js`);
    });
  }
};

export const localeDataModules: {
  [key in ELocale]: () => Promise<void>;
} = Object.values(ELocale).reduce((acc, curr) => {
  acc[curr] = createDoPolyfillsForLocale(curr);
  return acc;
}, {} as Record<ELocale, () => Promise<void>>);

export const DEFAULT_LOCALE = ELocale.EN;

export const isValidLocale = (locale?: string | null): locale is ELocale =>
  !!locale && Object.values(ELocale).indexOf(locale as ELocale) !== -1;

export const registerDatepickerLocale = (locale: ELocale | null) =>
  Promise.resolve(isValidLocale(locale) ? locale : DEFAULT_LOCALE).then(
    safeLocale => {
      const localeKey = dateFnsLocaleKeys[safeLocale] || 'enUS';
      const dateFnsLocale = dateFnsLocales[localeKey];

      registerLocale(localeKey, dateFnsLocale);
      setDefaultLocale(localeKey);
    }
  );
