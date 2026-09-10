import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/db/supabaseClient';
import { Loader2 } from 'lucide-react';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (!supabase) throw new Error('Supabase client not initialized');

        // Supabase handles the session automatically from the URL hash.
        // We just need to check if the user is authenticated.
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        if (!session?.user) throw new Error('No user found in session');

        const user = session.user;
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || 'Citizen';

        // Check if profile exists
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('id', user.id)
          .single();

        if (!profile) {
          // Create new profile for Google user
          const { error: insertError } = await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            full_name: fullName,
            role: 'CITIZEN'
          });

          if (insertError) throw insertError;
          navigate('/my-reports', { replace: true });
        } else {
          // Profile exists, redirect based on role
          if (profile.role === 'AUTHORITY') {
            navigate('/authority', { replace: true });
          } else {
            navigate('/my-reports', { replace: true });
          }
        }

      } catch (err: any) {
        console.error('Auth Callback Error:', err);
        setError(`Authentication failed: ${err.message || 'Unknown error'}`);
        setTimeout(() => navigate('/login'), 5000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {error ? (
        <div className="text-center space-y-4">
          <p className="text-red-600 font-bold text-lg">{error}</p>
          <p className="text-gray-500">Redirecting to login...</p>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Completing Sign In...</h2>
          <p className="text-gray-500">Please wait while we verify your account.</p>
        </div>
      )}
    </div>
  );
};
