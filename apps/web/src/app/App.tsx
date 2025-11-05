import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HomePage } from '../features/seasons/HomePage';
import { DriversPage } from '../features/drivers/DriversPage';
import { DriverDetailPage } from '../features/drivers/DriverDetailPage';
import { LivePage } from '../features/live/LivePage';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/drivers/:driverId" element={<DriverDetailPage />} />
          <Route path="/live" element={<LivePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
