'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user info from the dashboard API
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/dashboard', {
        method: 'GET',
        credentials: 'include', // Ensure cookies are sent
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        // If user is not authorized, redirect to login
        router.push('/login');
      }

      setLoading(false);
    };

    fetchUser();
  }, [router]);

  // Logout function
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found or unauthorized</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

