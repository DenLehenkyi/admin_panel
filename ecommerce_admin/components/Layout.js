import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Увійти з Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mb-2 mr-2 rounded-lg p-5">
        {children}
      </div>
    </div>
  );
}
