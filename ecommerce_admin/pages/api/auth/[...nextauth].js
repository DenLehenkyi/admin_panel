import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Admins } from '@/models/Admins';
import clientPromise from '@/lib/mongodb'; // Імпортуйте clientPromise з відповідного місця

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  
  callbacks: {
    session: async ({ session, token, user }) => {
      const { email } = session?.user || {};
      const isAdmin = await Admins.exists({ email });

      if (isAdmin) {
        return session; 
      } else {
        return false; 
      }
    }
  },
  secret: process.env.NEXT_AUTH_SECRET,
}

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}
