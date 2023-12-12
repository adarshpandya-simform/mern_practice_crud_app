import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRoutes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import routes from './router';
import { trpc } from './trpc';
import AuthMiddleware from './middleware/AuthMiddleware';
import { queryClient, trpcClient } from './config/clients';

const AppContent: React.FC = () => {
  const content = useRoutes(routes);
  return content;
};

const App: React.FC = () => {
  return (
    <CookiesProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AuthMiddleware>
            <AppContent />
          </AuthMiddleware>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </trpc.Provider>
    </CookiesProvider>
  );
};

export default App;
