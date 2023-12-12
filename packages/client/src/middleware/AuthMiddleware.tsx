import React from 'react';
import { useCookies } from 'react-cookie';
import { useQueryClient } from '@tanstack/react-query';

import FullScreenLoader from '../components/FullScreenLoader';
import { trpc } from '../trpc';
import { IUser } from '../lib/types';
import useStore from '../store';
import { useNavigate } from 'react-router-dom';

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);
  const store = useStore();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { refetch } = trpc.refreshToken.useQuery(undefined, {
    retry: 1,
    enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries([['getUser']]);
    },
    onError: () => {
      navigate('/login');
    },
  });

  const query = trpc.getUser.useQuery(undefined, {
    retry: 1,
    enabled: !!cookies.logged_in,
    select: (data) => data.data.user,
    onSuccess: (data) => {
      store.setAuthUser(data as IUser);
    },
    onError: (error) => {
      let retryRequest = true;
      if (error.message.includes('must be logged in') && retryRequest) {
        retryRequest = false;
        try {
          refetch({ throwOnError: true });
        } catch (err: any) {
          if (err.message.includes('Could not refresh access token')) {
            navigate('/login');
          }
        }
      }
    },
  });

  if (query.isLoading && cookies.logged_in) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
