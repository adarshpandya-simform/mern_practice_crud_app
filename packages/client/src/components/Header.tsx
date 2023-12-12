import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import useStore from '../store';
import { trpc } from '../trpc';
import PostModal from './modals/post.modal';
import CreatePost from './posts/create.post';
import Spinner from './Spinner';

const Header: React.FC = () => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const navigate = useNavigate();
  const store = useStore();
  const user = store.authUser;

  const queryClient = useQueryClient();
  const { mutate: logoutUser } = trpc.logoutUser.useMutation({
    onSuccess() {
      queryClient.clear();
      navigate('/login');
    },
    onError() {
      queryClient.clear();
      navigate('/login');
    },
  });

  const handleLogout = () => logoutUser();

  return (
    <>
      <header className='bg-white h-20'>
        <nav className='h-full flex justify-between container items-center'>
          <div>
            <Link to='/' className='text-ct-dark-600 text-2xl font-semibold'>
              Example App
            </Link>
          </div>
          <ul className='flex items-center gap-4'>
            <li>
              <Link to='/' className='text-ct-dark-600'>
                Home
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link to='/register' className='text-ct-dark-600'>
                    SignUp
                  </Link>
                </li>
                <li>
                  <Link to='/login' className='text-ct-dark-600'>
                    Login
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link to='/profile' className='text-ct-dark-600'>
                    Profile
                  </Link>
                </li>
                <li
                  className='cursor-pointer'
                  onClick={() => setOpenPostModal(true)}
                >
                  Create Post
                </li>
                <li className='cursor-pointer' onClick={handleLogout}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <PostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      >
        <CreatePost setOpenPostModal={setOpenPostModal} />
      </PostModal>
      <div className='pt-4 pl-2 bg-transparent fixed'>
        {store.pageLoading && <Spinner color='text-ct-yellow-600' />}
      </div>
    </>
  );
};

export default Header;
