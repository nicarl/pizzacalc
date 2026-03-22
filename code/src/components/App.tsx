import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { Calculator } from './Calculator';
import { LegalNotice } from './LegalNotice';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background font-sans text-text-primary">
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/legal" element={<LegalNotice />} />
        </Routes>
        <footer className="py-6 text-center">
          <Link
            to="/legal"
            className="text-xs text-text-secondary underline-offset-2 hover:underline"
          >
            Legal Notice
          </Link>
        </footer>
      </div>
    </BrowserRouter>
  );
}
