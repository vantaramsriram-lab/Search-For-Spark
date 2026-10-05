import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SelectionProvider } from './context/SelectionContext';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import ApplicationPage from './application/ApplicationPage';

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/' || location.state?.scrollTo) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.state]);
  return null;
}

export default function App() {
  return (
    <SelectionProvider>
      <div className="grain min-h-screen bg-ink text-paper">
        <CustomCursor />
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<ApplicationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </SelectionProvider>
  );
}
