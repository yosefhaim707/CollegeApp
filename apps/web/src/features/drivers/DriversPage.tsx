import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useListDriversQuery } from '../../lib/api';
import { Button } from '@f1-stats-suite/ui';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { DriverDTO } from '@f1-stats-suite/types';

export function DriversPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const { data } = useListDriversQuery({ search });
  const navigate = useNavigate();

  const drivers = useMemo(() => data ?? [], [data]);

  const columnHelper = useMemo(() => createColumnHelper<DriverDTO>(), []);
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => `${row.givenName} ${row.familyName}`, {
        id: 'name',
        header: 'Driver',
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor('nationality', {
        header: 'Nationality',
      }),
      columnHelper.accessor('code', {
        header: 'Code',
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: (info) => (
          <Button variant="ghost" onClick={() => navigate(`/drivers/${info.row.original.driverId}`)}>
            View
          </Button>
        ),
      }),
    ],
    [columnHelper, navigate],
  );

  const table = useReactTable({
    data: drivers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('drivers.title')}</h1>
          <p className="text-foreground/70">
            Historical results and form courtesy of Ergast + OpenF1 adapters.
          </p>
        </div>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('drivers.searchPlaceholder')}
          className="h-10 rounded-md border border-foreground/20 bg-black/30 px-3"
        />
      </header>
      <div className="overflow-hidden rounded-lg border border-foreground/10">
        <table className="w-full divide-y divide-foreground/10">
          <thead className="bg-black/40 text-left text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Driver</th>
              <th className="px-4 py-3">Nationality</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3" aria-label="actions"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-black/40">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
