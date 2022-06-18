import React, { ReactNode } from "react";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "https://graphql.fauna.com/graphql",
  fetchOptions: () => {
    const key: string | undefined = process.env.NEXT_PUBLIC_FAUNA_AUTH;
    return {
      headers: { authorization: key ? key : "" },
    };
  },
});

export const UrqlProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={client}>{children}</Provider>;
};
