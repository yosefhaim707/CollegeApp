import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { setLocale } from '../features/ui/ui-slice';
import { Button } from '@f1-stats-suite/ui';

export function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const locale = useAppSelector((state) => state.ui.locale);

  const toggleLocale = () => {
    const next = locale === 'en' ? 'he' : 'en';
    i18n.changeLanguage(next);
    document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr';
    dispatch(setLocale(next));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-foreground/20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <nav className="flex items-center gap-4 text-sm uppercase tracking-wide">
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/drivers">{t('nav.drivers')}</Link>
            <Link to="/live">{t('nav.live')}</Link>
          </nav>
          <Button variant="outline" onClick={toggleLocale}>
            {locale === 'en' ? 'עברית' : 'English'}
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8 space-y-6">{children}</main>
    </div>
  );
}
