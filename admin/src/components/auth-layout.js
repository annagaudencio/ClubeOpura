import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/' && router.pathname !== '/login') {
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthLayout;
