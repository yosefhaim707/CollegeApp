import { describe, expect, it } from 'vitest';
import { i18n } from '../lib/i18n';

describe('i18n', () => {
  it('loads english strings', () => {
    expect(i18n.t('nav.home')).toBe('Home');
  });
});
