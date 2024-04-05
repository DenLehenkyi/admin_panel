import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
        </div>
      </div>
    ); 
  }
  
  return (
    <div className='bg-blue-900 min-h-screen'>
      
    <Nav></Nav>
    <div>Logged in {session.user.email}</div>
    </div>
  );
}
