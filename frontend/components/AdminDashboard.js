import { useEffect  } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext.js';

function AdminDashboard() {
  const router = useRouter();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/'); // Redirect non-admin users to the homepage
    }
  }, [user]);

  return (
    <div>  
    </div>
  
  );
}

export default AdminDashboard;
