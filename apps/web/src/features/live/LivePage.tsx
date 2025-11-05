import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LiveLapPayload {
  event: string;
  data: {
    raceId: string;
    driverId: string;
    lap: number;
    timeMs: number;
    sectorTimesMs: number[];
  };
}

const wsUrl = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8080/live';

export function LivePage() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<LiveLapPayload['data'][]>([]);

  useEffect(() => {
    const socket = new WebSocket(wsUrl);
    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data) as LiveLapPayload;
      if (payload.event === 'live:lap') {
        setEvents((prev) => [payload.data, ...prev].slice(0, 10));
      }
    };
    socket.onopen = () => {
      socket.send(JSON.stringify({ raceId: '2023-01' }));
    };
    return () => socket.close();
  }, []);

  const tableRows = useMemo(() => events, [events]);

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold">{t('live.title')}</h1>
        <p className="text-foreground/70">{t('live.description')}</p>
      </header>
      <div className="rounded-lg border border-foreground/10 bg-black/30">
        <table className="w-full text-sm">
          <thead className="border-b border-foreground/10 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Driver</th>
              <th className="px-4 py-3 text-left">Lap</th>
              <th className="px-4 py-3 text-left">Time (ms)</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((lap) => (
              <tr key={`${lap.driverId}-${lap.lap}`} className="border-b border-foreground/10">
                <td className="px-4 py-2 font-medium">{lap.driverId}</td>
                <td className="px-4 py-2">{lap.lap}</td>
                <td className="px-4 py-2">{lap.timeMs.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
