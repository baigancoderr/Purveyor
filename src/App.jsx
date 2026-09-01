import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';

const HomePage   = lazy(() => import('./pages/HomePage'));
const PresalePage = lazy(() => import('./pages/PresalePage'));

const Loader = () => (
  <div className="min-h-screen bg-[#111111] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-[#FFA200]/20 border-t-[#FFA200] rounded-full animate-spin" />
      <p className="text-[#FFA200] text-sm Gsemibold tracking-widest uppercase">Loading…</p>
    </div>
  </div>
);

/* Layout that wraps public landing pages with Navbar + Footer */
const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Landing page */}
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />

          {/* Presale — full page, no shared nav/footer (has its own) */}
          <Route path="/presale" element={<PresalePage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
