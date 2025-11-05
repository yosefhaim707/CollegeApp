import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetDriverQuery } from '../../lib/api';

const formData = [
  { race: 'Bahrain', position: 1 },
  { race: 'Jeddah', position: 2 },
  { race: 'Melbourne', position: 1 },
  { race: 'Baku', position: 3 },
  { race: 'Miami', position: 2 },
];

export function DriverDetailPage() {
  const { driverId } = useParams();
  const { data } = useGetDriverQuery(driverId ?? '', { skip: !driverId });

  const chartData = useMemo(() => formData, []);

  if (!driverId) {
    return null;
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          {data?.givenName} {data?.familyName}
        </h1>
        <p className="text-foreground/70">
          {data?.nationality} • {data?.dateOfBirth}
        </p>
      </header>
      <div className="rounded-lg border border-foreground/10 bg-black/30 p-4">
        <h2 className="text-lg font-semibold">Recent Form</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="race" stroke="var(--color-fg)" />
              <YAxis reversed stroke="var(--color-fg)" allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="position" stroke="var(--color-accent)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
