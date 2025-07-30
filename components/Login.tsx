'use client';

import { useEffect, useState } from 'react';
import { signInWithGoogle, logout } from '@/lib/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Login() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </>
      ) : (
        <button onClick={signInWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign in with Google
        </button>
      )}
    </div>
  );
}
