export type AppLanguage = 'en' | 'pl';

/**
 * Represents a value containing all supported language variants.
 * Intended for mocks, placeholders, and raw Sanity-shaped data.
 * CMS queries should normally project only the currently active language.
 */
export type LocalizedValue<T> = Record<AppLanguage, T>;
