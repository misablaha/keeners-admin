import polyglotI18nProvider from 'ra-i18n-polyglot';
import cs from './cs';

const messages = new Map<string, any>([['cs', cs]]);

const i18nProvider = polyglotI18nProvider((locale) => messages.get(locale) || cs, 'cs');

export default i18nProvider;
