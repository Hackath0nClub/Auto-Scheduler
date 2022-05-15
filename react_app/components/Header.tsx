import { useUser } from "@auth0/nextjs-auth0";

export const Header = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const userEmail = user && user.email;

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Auto Scheduler
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="https://github.com/Hackath0nClub/Auto-Scheduler"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              GitHub
            </a>
          </div>
          <p>{userEmail}</p>
          <div>
            <a
              href="/api/auth/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-2"
            >
              Login
            </a>
            <a
              href="/api/auth/logout"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-2"
            >
              Logout
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
