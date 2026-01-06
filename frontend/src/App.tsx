import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider';
import Navbar from './components/layout/Navbar';
import { Routes, Route } from 'react-router-dom';

import { Suspense, lazy } from 'react';
import PageWrapper from './components/layout/PageWrapper';
import { Spinner } from './components/ui/spinner';

// const Home = lazy(() => import('./pages/Home'));
// const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Calculator = lazy(() => import('./pages/Calculator/Calculator'));

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <PageWrapper>
          <Navbar />
          <Suspense fallback={<Spinner className='w-full flex justify-center items-center' />}>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Calculator />} />
              {/* <Route path="/about" element={<About />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageWrapper>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
