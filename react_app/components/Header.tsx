import { useUser } from "@auth0/nextjs-auth0";

export const Header = () => {
  const { user, error, isLoading } = useUser();

  const Auth = () => {
    let userEmail: string | null | undefined;
    let loginHref;
    let buttonValue;

    if (isLoading) userEmail = "Loading...";
    if (error) userEmail = "Login error";
    if (user) {
      userEmail = user.email;
      loginHref = "/api/auth/logout";
      buttonValue = "Logout";
    } else {
      loginHref = "/api/auth/login";
      buttonValue = "Login";
    }

    return (
      <>
        <p className="text-xl tracking-tight text-white mx-4">{userEmail}</p>
        <a
          href={loginHref}
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-2"
        >
          {buttonValue}
        </a>
      </>
    );
  };

  const Title = (props: { name: string }) => {
    return (
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          {props.name}
        </span>
      </div>
    );
  };

  const Link = (props: { name: string; href: string }) => {
    return (
      <div className="text-sm lg:flex-grow">
        <a
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          href={props.href}
        >
          {props.name}
        </a>
      </div>
    );
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <Title name="Auto Scheduler" />
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <Link
            name="GitHub"
            href="https://github.com/Hackath0nClub/Auto-Scheduler"
          />
          <Auth />
        </div>
      </nav>
    </>
  );
};
