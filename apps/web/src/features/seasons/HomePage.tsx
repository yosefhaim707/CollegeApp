import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useListSeasonsQuery } from '../../lib/api';
import { Button, cn } from '@f1-stats-suite/ui';

const demoSeasons = [2023, 2022, 2021];

export function HomePage() {
  const { t } = useTranslation();
  const [season, setSeason] = useState<number>(demoSeasons[0]);
  const { data, isFetching } = useListSeasonsQuery(season);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{t('home.title')}</h1>
        <p className="text-foreground/70">{t('home.description')}</p>
      </header>
      <div className="flex gap-2">
        {demoSeasons.map((year) => (
          <Button
            key={year}
            variant={season === year ? 'default' : 'outline'}
            onClick={() => setSeason(year)}
          >
            {year}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(data ?? []).slice(0, 4).map((driver) => (
          <article
            key={driver.driverId}
            className={cn(
              'rounded-lg border border-foreground/10 bg-black/20 p-4 shadow-lg backdrop-blur',
              isFetching && 'animate-pulse',
            )}
          >
            <h3 className="text-xl font-semibold">{driver.driverId}</h3>
            <dl className="mt-2 grid grid-cols-2 gap-2 text-sm text-foreground/80">
              <div>
                <dt className="uppercase tracking-wide">Points</dt>
                <dd className="text-lg font-bold">{driver.points}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-wide">Wins</dt>
                <dd className="text-lg font-bold">{driver.wins}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
