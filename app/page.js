'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the signup page when landing on the root
    router.push('/signup');
  }, [router]);

  return null; // No content to render since we are redirecting
};

export default Page;
